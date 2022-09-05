import ts from 'typescript'
import { filter, map, differenceBy, isEmpty, find } from 'lodash'

function getDecoratorOpts(decorators: ts.Node[], property: string) {
	const options = decorators.find(
		(decorator) =>
			decorator.kind === ts.SyntaxKind.PropertyAssignment &&
			//@ts-ignore
			decorator.name?.getText() === property,
	)
	// @ts-ignore
	return options ? options.initializer.properties : []
}

function getCommonMethods(node: ts.ClassDeclaration, property: string | string[]) {
	return node.members.filter(
		(member) =>
			member.kind === ts.SyntaxKind.MethodDeclaration &&
			(typeof property === 'string'
				? member.name?.getText() === property
				: property.includes(member.name?.getText() as string)),
	)
}

function generateUseMethods(node: ts.ClassDeclaration, decorators: ts.Node[]) {
	const properties = getDecoratorOpts(decorators, 'methods')
	const methods = node.members
		.filter(
			(member) =>
				member.kind === ts.SyntaxKind.MethodDeclaration &&
				!['render', 'mounted', 'created'].includes(member.name?.getText() as string),
		)
		.map((member) => {
			const { decorators, ...properties } = member
			return properties
		}) as ts.ObjectLiteralElementLike[]

	return methods.length
		? ts.factory.createPropertyAssignment(
			'methods',
			ts.factory.createObjectLiteralExpression(properties.concat(methods), true),
		)
		: null
}

function getConstructor(node: ts.ClassDeclaration) {
	//@ts-ignore
	const statements = node.members.find((member) => member.kind === ts.SyntaxKind.Constructor)?.body
		?.statements as ts.Statement[]

	if (!statements || !statements.length) {
		return null
	}

	const expressions = statements.filter((statement: ts.Statement) => {
		if (statement.kind === ts.SyntaxKind.ExpressionStatement) {
			//@ts-ignore
			if (statement.expression.expression?.kind === ts.SyntaxKind.SuperKeyword) {
				return false
			}
			if (
				//@ts-ignore
				ts.isBinaryExpression(statement.expression) &&
				//@ts-ignore
				statement.expression?.left?.expression.kind === ts.SyntaxKind.ThisKeyword
			) {
				return false
			}
			return true
		}
		return true
	})

	const data = statements.filter((statement) => {
		return (
			statement.kind === ts.SyntaxKind.ExpressionStatement &&
			//@ts-ignore
			ts.isBinaryExpression(statement.expression) &&
			//@ts-ignore
			statement.expression?.left?.expression.kind === ts.SyntaxKind.ThisKeyword
		)
	})

	return { data, expressions }
}

function getRefOrReactive(node: ts.ClassDeclaration) {
	const { data } = getConstructor(node) || { data: [] }

	const properties = node.members.filter(
		(member) => member.kind === ts.SyntaxKind.PropertyDeclaration && !member.decorators,
	)

	return (
		properties
			// .filter((property) => {
			// 	if (!data.length) {
			// 		return true
			// 	}
			// 	return data.find(
			// 		//@ts-ignore
			// 		(item: ts.BinaryExpression) => item.expression.left?.name?.getText() === property.name?.getText(),
			// 	)
			// })
			.map((variable) => {
				return ts.factory.createVariableStatement(
					undefined,
					ts.factory.createVariableDeclarationList(
						[
							ts.factory.createVariableDeclaration(
								variable.name?.getText() as string,
								undefined,
								undefined,
								ts.factory.createCallExpression(
									ts.factory.createIdentifier('ref'),
									// @ts-ignore
									variable.type ? [variable.type] : undefined,
									// @ts-ignore
									variable.initializer ? [variable.initializer] : undefined,
								),
							),
						],
						ts.NodeFlags.Const,
					),
				)
			})
	)
}

function generateComponentOpts(decorators: ts.Node[]) {
	const properties = getDecoratorOpts(decorators, 'components')
	return properties.length
		? ts.factory.createPropertyAssignment('components', ts.factory.createObjectLiteralExpression(properties, true))
		: null
}

function generateLifecycleMethods(node: ts.ClassDeclaration) {
	return getCommonMethods(node, ['created', 'mounted'])
}

function generateRenderMethod(node: ts.ClassDeclaration) {
	return getCommonMethods(node, 'render')[0]
}

function generateWatchOpts(node: ts.ClassDeclaration) {
	const watches = node.members.filter((member) => {
		return (
			member.kind === ts.SyntaxKind.MethodDeclaration &&
			//@ts-ignore
			member.decorators?.[0]?.expression.expression.getText() === 'Watch'
		)
	})
	return watches.length
		? ts.factory.createPropertyAssignment(
			'watch',
			ts.factory.createObjectLiteralExpression(
				watches.map((property) => {
					//@ts-ignore
					const name = property.decorators?.[0]?.expression.arguments[0].text as string

					return ts.factory.createPropertyAssignment(
						name.includes('$') ? `'${name}'` : name,
						ts.factory.createObjectLiteralExpression(
							[
								ts.factory.createPropertyAssignment(
									'handler',
									ts.factory.createIdentifier(`'${property.name?.getText()}'`),
								),
								//@ts-ignore
								...(property.decorators?.[0]?.expression.arguments[1]
									? //@ts-ignore
									property.decorators?.[0]?.expression.arguments[1]?.properties
									: []),
							],
							true,
						),
					)
				}),
				true,
			),
		)
		: null
}

function generatePropsOpts(node: ts.ClassDeclaration) {
	const properties = node.members.filter((member) => {
		return (
			member.kind === ts.SyntaxKind.PropertyDeclaration &&
			//@ts-ignore
			['Prop', 'PropSync'].includes(member.decorators?.[0]?.expression.expression.getText() as string)
		)
	})
	return properties.length
		? ts.factory.createPropertyAssignment(
			'props',
			ts.factory.createObjectLiteralExpression(
				properties.map((property) => {
					return ts.factory.createPropertyAssignment(
						property.name?.getText() as string,
						//@ts-ignore
						property.decorators?.[0]?.expression.arguments[0],
					)
				}),
				true,
			),
		)
		: null
}

function generateComputedOpts(node: ts.ClassDeclaration, decorators: ts.Node[]) {
	const properties = getDecoratorOpts(decorators, 'computed')

	const getAccessors = filter(node.members, member => member.kind === ts.SyntaxKind.GetAccessor)
	const setAccessors = filter(node.members, member => member.kind === ts.SyntaxKind.SetAccessor)

	const hasGetAndSetComputedOpts = map(setAccessors, accessor => {
		const getAccessor = find(getAccessors, item => item.name?.getText() === accessor.name?.getText())
		return ts.factory.createPropertyAssignment(accessor.name?.getText() as string, ts.factory.createObjectLiteralExpression([
			//@ts-ignore
			ts.factory.createPropertyAssignment('get', ts.factory.createFunctionExpression(undefined, undefined, undefined, undefined, undefined, undefined, getAccessor.body)),
			//@ts-ignore
			ts.factory.createPropertyAssignment('set', ts.factory.createFunctionExpression(undefined, undefined, undefined, undefined, accessor.parameters, undefined, accessor.body))
		], true))
	})	

	const options = map(differenceBy(getAccessors, setAccessors, member => member.name?.getText()), (accessor) => {
		return ts.factory.createMethodDeclaration(
			undefined,
			undefined,
			undefined,
			//@ts-ignore
			accessor.name,
			undefined,
			undefined,
			[],
			undefined,
			//@ts-ignore
			accessor.body,
		)
	})
	return !isEmpty(properties.concat(getAccessors))
		? ts.factory.createPropertyAssignment(
			'computed',
			//@ts-ignore
			ts.factory.createObjectLiteralExpression(properties.concat(hasGetAndSetComputedOpts, options), true),
		)
		: null
}

function getPropertyData(node: ts.ClassDeclaration) {
	return node.members.filter(
		(member) => member.kind === ts.SyntaxKind.PropertyDeclaration && !member.decorators,
	)
}

function generateSetupMethod(node: ts.ClassDeclaration) {
	if (!getConstructor(node) && !getPropertyData(node).length) {
		return null
	}
	const params = ts.factory.createParameterDeclaration(
		undefined,
		undefined,
		undefined,
		ts.factory.createIdentifier('props'),
	)
	const { data, expressions } = getConstructor(node) || { data: [], expressions: [] }

	const returnStatement = data.length
		? data.map((item) =>
			//@ts-ignore
			ts.factory.createShorthandPropertyAssignment(item.expression.left?.name?.getText() as string),
		)
		: getPropertyData(node).map((item) => ts.factory.createShorthandPropertyAssignment(item.name?.getText() as string))

	return ts.factory.createMethodDeclaration(
		undefined,
		undefined,
		undefined,
		ts.factory.createIdentifier('setup'),
		undefined,
		undefined,
		[params],
		undefined,
		ts.factory.createBlock(
			[
				...getRefOrReactive(node),
				...expressions,
				ts.factory.createReturnStatement(
					ts.factory.createObjectLiteralExpression(
						returnStatement,
						true,
					),
				),
			],
			true,
		),
	)
}

function transform(ctx: ts.TransformationContext) {
	const visitor: ts.Visitor = (node: ts.Node) => {
		if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
			const moduleSpecifier = node.moduleSpecifier.text
			if (moduleSpecifier.includes('vue-property-decorator')) {
				const dependencies = [ts.factory.createIdentifier('defineComponent')]
				return ctx.factory.updateImportDeclaration(
					node,
					node.decorators,
					node.modifiers,
					ts.factory.createImportClause(
						false,
						// @ts-ignore
						ts.factory.createNamedImports(dependencies),
						undefined,
					),
					ctx.factory.createStringLiteral('@vue/composition-api'),
					node.assertClause,
				)
			}
		}
		if (ts.isClassDeclaration(node) && node.decorators) {
			const name = (node.name && ts.isIdentifier(node.name) ? node.name.escapedText : '') as string
			// @ts-ignore
			const decorators = node.decorators[0].expression.arguments
				? // @ts-ignore
				(node.decorators[0].expression.arguments[0].properties as ts.Node[])
				: []

			const isDefaultExport =
				node.modifiers &&
				node.modifiers.find((modifier) => ts.isModifier(modifier) && modifier.kind === ts.SyntaxKind.DefaultKeyword)

			// defineComponent 内的所有设置
			const options = [
				name && ctx.factory.createPropertyAssignment('name', ctx.factory.createStringLiteral(name)),
				generateComponentOpts(decorators),
				generatePropsOpts(node),
				generateWatchOpts(node),
				generateSetupMethod(node),
				generateComputedOpts(node, decorators),
				...generateLifecycleMethods(node),
				generateUseMethods(node, decorators),
				generateRenderMethod(node),
			].filter(Boolean) as ts.ObjectLiteralElementLike[]

			const defineComponentNode = ctx.factory.createCallExpression(
				ctx.factory.createIdentifier('defineComponent'),
				undefined,
				[ctx.factory.createObjectLiteralExpression(options, true)],
			)

			if (isDefaultExport) {
				return ctx.factory.createExportAssignment(undefined, node.modifiers, undefined, defineComponentNode)
			}
			const componentNode = ctx.factory.createVariableDeclaration(
				ctx.factory.createIdentifier(name),
				undefined,
				undefined,
				defineComponentNode,
			)

			return ctx.factory.createVariableStatement(
				node.modifiers,
				ctx.factory.createVariableDeclarationList([componentNode], ts.NodeFlags.Const),
			)
		}
		return node
	}
	return (sourceFile: ts.SourceFile) => ts.visitEachChild(sourceFile, visitor, ctx)
}

export function traverse(sourceFile: ts.SourceFile): ts.TransformationResult<ts.Node> {
	return ts.transform(sourceFile, [transform])
}
