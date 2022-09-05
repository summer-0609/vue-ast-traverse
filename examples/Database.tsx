import { defineComponent } from "@vue/composition-api";
import { includes, intersection, findIndex } from 'lodash';
import './Database.scss';
export default defineComponent({
    name: "Database",
    props: {
        dbs: { type: Object, required: true }
    },
    setup(props) {
        const baseDataBases = ref<any>();
        const epoDatas = ref<any>();
        const baseDataBases = ['EP', 'WO', 'US', 'CN', 'JP', 'GB', 'FR', 'DE', 'KR', 'CA'];
        const epoDatas = ['DE', 'FR', 'GB'];
        return {
            baseDataBases,
            epoDatas
        };
    },
    methods: {
        handleCheckDb(e: any) {
            const selected = this.dbs.selected.slice(0);
            const db = e.target.value;
            if (e.target.checked) {
                selected.push(db);
            }
            else {
                selected.splice(findIndex(selected, (x: any) => x === db), 1);
            }
            this.selected = selected;
        }
    },
    render() {
        return (<div class="common-database">
                <div class="common-database__action">
                    <label class="label">
                        <input checked={this.hasSelectedAll} onChange={(val: any) => (this.hasSelectedAll = val.target.value)} type="checkbox"/>
                        <span>{this.$t('common.database.allDatabases')}</span>
                    </label>
                </div>
                <ul class="common-database__items">
                    {this.baseDataBases.map((db: any) => {
                return (<li class={{ 'common-database__col': true, 'special-col': db === 'WO' }} key={db}>
                                <label class={{
                        'common-database__item': true,
                        'common-database__item--noEpo': db === 'EP' && this.showTip,
                    }}>
                                    <input class="select-input" type="checkbox" checked={!!this.selected.find((x: any) => x === db)} onChange={this.handleCheckDb} value={db}/>
                                    <div class={['flag', 'flag--' + db]}/>
                                    <div class="name">{this.$t('common.database.' + db.toLowerCase())}</div>
                                </label>
                                {db === 'WO' && this.showTip ? (<div class="tip-contry">{this.$t('common.database.chooseTip')}</div>) : null}
                            </li>);
            })}
                </ul>
            </div>);
    }
});
