import { ref, defineComponent } from "@vue/composition-api";
import { Select, Option } from 'element-ui';
import { Input } from 'patsnap-ui';
import Tool from '../components/Tool/Tool';
// @ts-ignore
import { revTrans } from '../scripts/rev_trans';
const template = `>sample sequence
ACDEFGHIKLMNPQRSTVWY*
`;
export default defineComponent({
    name: "ReverseTranslate",
    components: {
        Select,
        Option,
        Input,
    },
    setup(props) {
        const codeInput = ref(`AmAcid  Codon      Number    /1000     Fraction   ..

    Gly     GGG     50527.00     11.12      0.15
    Gly     GGA     39036.00      8.59      0.12
    Gly     GGT    114185.00     25.14      0.34
    Gly     GGC    130043.00     28.63      0.39

    Glu     GAG     83804.00     18.45      0.32
    Glu     GAA    179460.00     39.51      0.68
    Asp     GAT    146794.00     32.32      0.63
    Asp     GAC     87759.00     19.32      0.37

    Val     GTG    115687.00     25.47      0.36
    Val     GTA     51020.00     11.23      0.16
    Val     GTT     86572.00     19.06      0.27
    Val     GTC     67356.00     14.83      0.21

    Ala     GCG    146264.00     32.20      0.34
    Ala     GCA     93390.00     20.56      0.22
    Ala     GCT     73677.00     16.22      0.17
    Ala     GCC    113412.00     24.97      0.27

    Arg     AGG      7423.00      1.63      0.03
    Arg     AGA     12345.00      2.72      0.05
    Ser     AGT     41544.00      9.15      0.15
    Ser     AGC     70867.00     15.60      0.26

    Lys     AAG     51685.00     11.38      0.25
    Lys     AAA    156169.00     34.38      0.75
    Asn     AAT     84846.00     18.68      0.46
    Asn     AAC     98018.00     21.58      0.54

    Met     ATG    123604.00     27.21      1.00
    Ile     ATA     24233.00      5.34      0.09
    Ile     ATT    135873.00     29.92      0.50
    Ile     ATC    111878.00     24.63      0.41

    Thr     ACG     63696.00     14.02      0.26
    Thr     ACA     35995.00      7.93      0.15
    Thr     ACT     43256.00      9.52      0.18
    Thr     ACC    103121.00     22.70      0.42

    Trp     TGG     65630.00     14.45      1.00
    End     TGA      4428.00      0.97      0.30
    Cys     TGT     23461.00      5.17      0.45
    Cys     TGC     28747.00      6.33      0.55

    End     TAG      1172.00      0.26      0.08
    End     TAA      9006.00      1.98      0.62
    Tyr     TAT     75774.00     16.68      0.58
    Tyr     TAC     55847.00     12.30      0.42

    Leu     TTG     60322.00     13.28      0.13
    Leu     TTA     62823.00     13.83      0.13
    Phe     TTT    100128.00     22.05      0.57
    Phe     TTC     74885.00     16.49      0.43

    Ser     TCG     39546.00      8.71      0.15
    Ser     TCA     35837.00      7.89      0.13
    Ser     TCT     42367.00      9.33      0.16
    Ser     TCC     40365.00      8.89      0.15

    Arg     CGG     25751.00      5.67      0.10
    Arg     CGA     16607.00      3.66      0.07
    Arg     CGT     93997.00     20.70      0.37
    Arg     CGC     96053.00     21.15      0.38

    Gln     CAG    130898.00     28.82      0.66
    Gln     CAA     67129.00     14.78      0.34
    His     CAT     57585.00     12.68      0.57
    His     CAC     43743.00      9.63      0.43

    Leu     CTG    231373.00     50.94      0.49
    Leu     CTA     18067.00      3.98      0.04
    Leu     CTT     51442.00     11.33      0.11
    Leu     CTC     48147.00     10.60      0.10

    Pro     CCG    101467.00     22.34      0.51
    Pro     CCA     38663.00      8.51      0.20
    Pro     CCT     32678.00      7.19      0.17
    Pro     CCC     24383.00      5.37      0.12
    `);
        return {
            codeInput
        };
    },
    render() {
        return (<Tool title={this.$t('app.tools.ReverseTranslate.title')} desc={this.$t('app.tools.ReverseTranslate.desc')} submit={revTrans} template={template} supportFormat={['.fasta', '.fas', '.fsa', '.fa', '.seq', '.FASTA', '.FAS', '.FSA', '.FA']} maxQuery={20000} valdiator={{
                codeInput: this.codeInput,
            }} scopedSlots={{
                default: () => (<div class="translate__input">
                            <i18n path="app.tools.ReverseTranslate.input" tag="div">
                                <a href={this.$t('app.tools.ReverseTranslate.url')} target="_blank">
                                    {this.$t('app.tools.ReverseTranslate.database')}
                                </a>
                            </i18n>
                            <div class="reverse-translate__textarea">
                                <textarea ref="textarea" v-model={this.codeInput} spellcheck="false" autocomplete="off"/>
                            </div>
                        </div>),
            }}/>);
    }
});
