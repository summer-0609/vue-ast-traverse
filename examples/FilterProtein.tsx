import { ref, defineComponent } from "@vue/composition-api";
import { Select, Option } from 'element-ui';
import Tool from '../components/Tool/Tool';
// @ts-ignore
import { filterProtein } from '../scripts/filter_protein';
const template = `1 MEKVNEERDA VFEDHIGDRR RSVRSLLEEA FADEMEKTSY
41 DVEVADTPQP HIPIRFRHPP IAGPVHDVFG DAIHDIFQKM
81 MKRGQAVDFC HWVSHLIATE IDEKFSEVAF RDVQYNPDIY
121 VTDSTTEAKK LFNDKIWPAI DKILQQNAET CPILSEKWSG
161 IHVSGDQLKG QRHKQEDRFL AYPNGQYMDR GEDPISVLAV
201 FDGHGGHECS QYAAGHLWET WLEVRKSRDP SDSLEDQLRK
241 SLELLDERMT VRSVKECWKG GSTAVCCAID MDQKLMALAW
281 LGDSPGYVMS NIEFRQLTRG HSPSDEREAR RVEEAGGQLF
321 VIGGELRVNG VLNLTRALGD VPGRPMISNE PETCQVPIES
361 SDYLVLLACD GISDVFNERD LYQLVEAFAN DYPVEDYAEL
401 SRFICTKAIE AGSADNVSVV IGFLRPPQDV WKLMKHESDD
441 EDSDVTDEE
`;
export default defineComponent({
    name: "SequenceSuite",
    components: {
        Select,
        Option,
    },
    setup(props) {
        const regexp = ref('[^ACDEFGHIKLMNPQRSTVWYacdefghiklmnpqrstvwy]');
        const replace = ref('');
        const wordCase = ref('saveCase');
        return {
            regexp,
            replace,
            wordCase
        };
    },
    render() {
        const regexps = [
            {
                value: '[^ACDEFGHIKLMNPQRSTVWYacdefghiklmnpqrstvwy]',
                label: this.$t('app.tools.FilterProtein.remove', ['ACDEFGHIKLMNPQRSTVWY']),
            },
            {
                value: '[^ACDEFGHIKLMNPQRSTVWYacdefghiklmnpqrstvwy*]',
                label: this.$t('app.tools.FilterProtein.remove', ['ACDEFGHIKLMNPQRSTVWY*']),
            },
            {
                value: '[^ABCDEFGHIKLMNPQRSTVWXYZabcdefghiklmnpqrstvwxyz.]',
                label: this.$t('app.tools.FilterProtein.remove', ['ABCDEFGHIKLMNPQRSTVWXYZ.']),
            },
            {
                value: '[^ABCDEFGHIKLMNPQRSTVWXYZabcdefghiklmnpqrstvwxyz*.]',
                label: this.$t('app.tools.FilterProtein.remove', ['ABCDEFGHIKLMNPQRSTVWXYZ*.']),
            },
            {
                value: 's',
                label: this.$t('app.tools.FilterDNA.removeSpace'),
            },
            {
                value: 'd',
                label: this.$t('app.tools.FilterDNA.removeDigits'),
            },
            {
                value: '[sd]',
                label: this.$t('app.tools.FilterDNA.removeSpaceAndDigits'),
            },
            {
                value: '[^a-z]',
                label: this.$t('app.tools.FilterDNA.removeLowercase'),
            },
            {
                value: '[^A-Z]',
                label: this.$t('app.tools.FilterDNA.removeUppercase'),
            },
        ];
        const replaceOptions = [
            {
                value: '',
                label: this.$t('app.tools.FilterDNA.noReplaceOption'),
            },
            {
                value: 'n',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['n']),
            },
            {
                value: 'N',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['N']),
            },
            {
                value: 'x',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['x']),
            },
            {
                value: 'X',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['X']),
            },
            {
                value: '-',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['-']),
            },
            {
                value: '?',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['?']),
            },
            {
                value: '*',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['*']),
            },
        ];
        const caseOptions = [
            {
                value: 'uppercase',
                label: this.$t('app.tools.FilterDNA.convertUppercase'),
            },
            {
                value: 'lowercase',
                label: this.$t('app.tools.FilterDNA.convertLowercase'),
            },
            {
                value: 'saveCase',
                label: this.$t('app.tools.FilterDNA.convertRemain'),
            },
        ];
        return (<Tool title={this.$t('app.tools.FilterProtein.title')} desc={this.$t('app.tools.FilterProtein.desc')} submit={filterProtein} template={template} supportFormat={['.txt', '.TXT']} maxQuery={500000} valdiator={{
                regexp: this.regexp,
                replace: this.replace,
                wordCase: this.wordCase,
            }} scopedSlots={{
                default: () => (<div class="filter-dna__select">
                            <Select class="filter-dna__select-item" v-model={this.regexp}>
                                {regexps.map((regexp) => (<Option label={regexp.label} value={regexp.value}></Option>))}
                            </Select>
                            <Select class="filter-dna__select-item" v-model={this.replace}>
                                {replaceOptions.map((replace) => (<Option label={replace.label} value={replace.value}></Option>))}
                            </Select>
                            <Select class="filter-dna__select-item" v-model={this.wordCase}>
                                {caseOptions.map((item) => (<Option label={item.label} value={item.value}></Option>))}
                            </Select>
                        </div>),
            }}></Tool>);
    }
});
