import { ref, defineComponent } from "@vue/composition-api";
import { Select, Option } from 'element-ui';
import { Input } from 'patsnap-ui';
import Tool from '../components/Tool/Tool';
// @ts-ignore
import { translate } from '../scripts/translate';
const template = `>sample sequence
gckugcgaygartty

>sample sequence 2
ggwgggggaggtggcgaggaagatgacgtggtagttgtcgcggcagctgccaggagaagtagcaagaaaaataacatgataattatcacgacaactacctggtgatgttgctagtaatattacttgttatttttctcgtcatcttcccggcgacgtcgccagcaacatcacctgctacttctcccgccacctccc
`;
export default defineComponent({
    name: "Translate",
    components: {
        Select,
        Option,
        Input,
    },
    setup(props) {
        const frame = ref('0');
        const direction = ref('direct');
        const code = ref('transl_table=1');
        return {
            frame,
            direction,
            code
        };
    },
    render() {
        const frames = [
            {
                value: '0',
                label: this.$t('app.tools.Translate.frame', [1]),
            },
            {
                value: '1',
                label: this.$t('app.tools.Translate.frame', [2]),
            },
            {
                value: '2',
                label: this.$t('app.tools.Translate.frame', [3]),
            },
            {
                value: 'uppercase',
                label: this.$t('app.tools.Translate.uppercaseFrame', [3]),
            },
        ];
        const directions = [
            {
                value: 'direct',
                label: this.$t('app.tools.Translate.direct'),
            },
            {
                value: 'reverse',
                label: this.$t('app.tools.Translate.reverse'),
            },
        ];
        const codes = [
            {
                value: 'transl_table=1',
                label: this.$t('app.tools.Translate.standard'),
            },
            {
                value: 'transl_table=2',
                label: this.$t('app.tools.Translate.mitochondrial', ['vertebrate', 2]),
            },
            {
                value: 'transl_table=3',
                label: this.$t('app.tools.Translate.mitochondrial', ['yeast', 3]),
            },
            {
                value: 'transl_table=4',
                label: this.$t('app.tools.Translate.mitochondrial', ['mold', 4]),
            },
            {
                value: 'transl_table=5',
                label: this.$t('app.tools.Translate.mitochondrial', ['invertebrate', 5]),
            },
            {
                value: 'transl_table=6',
                label: this.$t('app.tools.Translate.nuclear', ['ciliate', 6]),
            },
            {
                value: 'transl_table=9',
                label: this.$t('app.tools.Translate.mitochondrial', ['echinoderm', 9]),
            },
            {
                value: 'transl_table=10',
                label: this.$t('app.tools.Translate.nuclear', ['euplotid', 10]),
            },
            {
                value: 'transl_table=11',
                label: this.$t('app.tools.Translate.bacterial'),
            },
            {
                value: 'transl_table=12',
                label: this.$t('app.tools.Translate.nuclear', ['alternative yeast', 12]),
            },
            {
                value: 'transl_table=13',
                label: this.$t('app.tools.Translate.mitochondrial', ['ascidian', 13]),
            },
            {
                value: 'transl_table=14',
                label: this.$t('app.tools.Translate.mitochondrial', ['flatworm', 14]),
            },
            {
                value: 'transl_table=15',
                label: this.$t('app.tools.Translate.macronuclear'),
            },
            {
                value: 'transl_table=16',
                label: this.$t('app.tools.Translate.mitochondrial', ['chlorophycean', 16]),
            },
            {
                value: 'transl_table=21',
                label: this.$t('app.tools.Translate.mitochondrial', ['trematode', 21]),
            },
            {
                value: 'transl_table=22',
                label: this.$t('app.tools.Translate.mitochondrial', ['Scenedesmus obliquus', 22]),
            },
            {
                value: 'transl_table=23',
                label: this.$t('app.tools.Translate.mitochondrial', ['Thraustochytrium', 23]),
            },
        ];
        return (<Tool title={this.$t('app.tools.Translate.title')} desc={this.$t('app.tools.Translate.desc')} submit={translate} template={template} supportFormat={['.fasta', '.fas', '.fsa', '.fa', '.seq', '.FASTA', '.FAS', '.FSA', '.FA']} maxQuery={200000} valdiator={{
                frame: this.frame,
                direction: this.direction,
                code: this.code,
            }} scopedSlots={{
                default: () => (<div class="translate__input">
                            <i18n path="app.tools.Translate.from" tag="div">
                                <Select v-model={this.frame}>
                                    {frames.map((frame) => (<Option label={frame.label} value={frame.value}></Option>))}
                                </Select>
                                <Select v-model={this.direction}>
                                    {directions.map((direction) => (<Option label={direction.label} value={direction.value}></Option>))}
                                </Select>
                            </i18n>
                            <div style={{ margin: '12px 0' }}>
                                {this.$t('app.tools.Translate.use')}{' '}
                                <Select v-model={this.code}>
                                    {codes.map((code) => (<Option label={code.label} value={code.value}></Option>))}
                                </Select>{' '}
                                {this.$t('app.tools.Translate.code')}
                            </div>
                        </div>),
            }}/>);
    }
});
