import { ref, defineComponent } from "@vue/composition-api";
import { Select, Option } from 'element-ui';
import Tool from '../components/Tool/Tool';
// @ts-ignore
import { filterDna } from '../scripts/filter_dna';
const template = `1 ttaagatttg cgctttgcca actgtacacc caacctcggt
41 ttattgtcga acctcccgct tgtgccgcca tctgcatata
81 gatcccggtc agtccgtcac attctgccaa ttgagtatcc
121 tcgaagtctt attccacgtg ctcaaagcaa gggtatcgta
161 cagtgataac cgcctcgtgc agatccaaat tctcgattaa
201 cactcaagta ctgattttta tcatcaggta actaaaaact
241 cacaatttga agcaccagcg agaatcgttc tattctctag
281 cttcgcaaca tcgacagttg taatggcata acttcggcat
321 tcatagtggc tgagtttagc ggactaagcg aaaaactggt
361 cgttagatct tcctcaccat gattttacaa gaaaggtgaa
401 ctcaatttga cggcggtaaa gttagatggc tacgcgcgac
441 aagtctccgt atcgtcatga aattagcgaa gaggtaatgg
481 caaagcttgg ctacgaatac aggagcgcgc tgtgattaca
521 gtagggttag gatagcgaaa acgttcaacg tggatagact
561 cttatcggca cacgatcata tgcttccaag gttcccaagg
601 cgaattacta gggtgcacag agctacgagt acgctgtccg
641 gcttgattcg ctcgtacatc cactgttcaa aaagctccga
681 taccgacgat cactctcgat ctctgtgtgg gacgcactta
721 ttgtggaatc agtcaaccag tgaagcattc acatgtacgt
761 ggtacggcac gccgtggtat gttagcgttc cctgcgccgc
801 aagtaaaccc ttcagctgtc acctcctata gtaacacgct
841 cgcatgcaga gcctagcacc ttagctctga gttgcctgcc
881 ggaaggatat attctgtatg tgattaaagc gaagtcaaag
921 taaacccccc acatgcagac ctgggtaaat tctcactcag
961 ttgaaacgta ggggccaata cgtgtgtcct tgatactact
`;
export default defineComponent({
    name: "SequenceSuite",
    components: {
        Select,
        Option,
    },
    setup(props) {
        const regexp = ref('[^gatcnGATCN]');
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
                value: '[^gatcnGATCN]',
                label: this.$t('app.tools.FilterDNA.removeGATCN'),
            },
            {
                value: '[^gatcryswkmbdhvnxGATCRYSWKMBDHVNX]',
                label: this.$t('app.tools.FilterDNA.removeGATCRY'),
            },
            {
                value: '[tT]',
                label: this.$t('app.tools.FilterDNA.removeT'),
            },
            {
                value: '[uU]',
                label: this.$t('app.tools.FilterDNA.removeU'),
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
                value: 't',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['t']),
            },
            {
                value: 'T',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['T']),
            },
            {
                value: 'u',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['u']),
            },
            {
                value: 'U',
                label: this.$t('app.tools.FilterDNA.replaceOption', ['U']),
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
        return (<Tool title={this.$t('app.tools.FilterDNA.title')} desc={this.$t('app.tools.FilterDNA.desc')} submit={filterDna} supportFormat={['.txt', '.TXT']} maxQuery={500000} template={template} valdiator={{
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
