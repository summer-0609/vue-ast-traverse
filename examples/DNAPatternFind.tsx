import { ref, defineComponent } from "@vue/composition-api";
import { Select, Option } from 'element-ui';
import { Input } from 'patsnap-ui';
import Tool from '../components/Tool/Tool';
// @ts-ignore
import { dnaPattern } from '../scripts/dna_pattern';
const template = `>sample sequence one
ttaaggaccccatgccctcgaataggcttgagcttgccaattaacgcgcacgggctggccgggcgtataagccaaggtgtagtgaggttgcattatacatgccggcttgtgattaacgcatgccataggacggttaggctcagaacccgcaaccaatacacgtgattttctcgtcccctg

>sample sequence two
aggcgtatgcgatcctgaccatgcaaaactccagcgtaaatacctagccatggcgacacaaggcgcaagacaggagatgacggcgtttagatcggcgaaatattaaagcaaacgacgatgacttcttcgggaaattagttccctactcgtgtactccaattagccataacactgttcgtcaagatatagggggtcacccatgaatgtcctctaaccagaccatttcgttacacgaacgtatct

>sample sequence three
tactcagggctccagaggtacaagttggtaatcggttaggtgtatcgccgccaggggtgcgtcgtcatgactcggttaga
`;
export default defineComponent({
    name: "DNAPatternFind",
    components: {
        Select,
        Option,
        Input,
    },
    setup(props) {
        const regexp = ref('ctt[ca]');
        return {
            regexp
        };
    },
    render() {
        return (<Tool title={this.$t('app.tools.DNAPatternFind.title')} desc={this.$t('app.tools.DNAPatternFind.desc')} submit={dnaPattern} template={template} supportFormat={['.fasta', '.fas', '.fsa', '.fa', '.seq', '.FASTA', '.FAS', '.FSA', '.FA']} maxQuery={500000} valdiator={{
                regexp: this.regexp,
            }} scopedSlots={{
                default: () => (<div class="dna-pattern__input">
                            <i18n path="app.tools.DNAPatternFind.input" tag="div">
                                {this.$t('app.tools.DNAPatternFind.pattern')}
                            </i18n>
                            <Input v-model={this.regexp}/>
                        </div>),
            }}/>);
    }
});
