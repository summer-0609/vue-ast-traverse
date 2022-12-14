import { ref, defineComponent } from "@vue/composition-api";
import { Select, Option } from 'element-ui';
import { Input } from 'patsnap-ui';
import Tool from '../components/Tool/Tool';
// @ts-ignore
import { proteinPattern } from '../scripts/protein_pattern';
const template = `>sample sequence one
MQKSPLMEKASFISKLFFSWTTPILRKGYRHHLELSDIYQAPSADSADHLSEKLEREWDREQASKKNPQLIHALRRCFFWRFLFYGILLYLGEVTKAVQPVLLGRIIASYDPENKVERSIAIYLGIGLCLLFIVRTLLLHPAIFGLHRIGMQMRTAMFSLIYKKTLKLSSRVLDKISIGQLVSLLSNNLNKFDEGLALAHFIWIAPLQVTLLMGLLWDLLQFSAFCGLGLLIILVIFQAILGKMMVKYRDQRAAKINERLVITSEIIDNIYSVKAYCWESAMEKMIENLREVELKMTRKAAYMRFFTSSAFFFSGFFVVFLSVLPYTVINGIVLRKIFTTISFCIVLRMSVTRQFPTAVQIWYDSFGMIRKIQDFLQKQEYKVLEYNLMTTGIIMENVTAFWEEGFGELLQKAQQSNGDRKHSSDENNVSFSHLCLVGNPVLKNINLNIEKGEMLAITGSTGLGKTSLLMLILGELEASEGIIKHSGRVSFCSQFSWI

>sample sequence two
MPGTIKENMIIFGVSYDEYRYKSVVKACQLQQDITKFAEQDNTVLGEGGVTLSGGQRARISLARAVYKDADLYLLDSPFGYLDVFTEEQVFESCVCKLMANKTRILVTSKMEHLRKADKILILHQGTSYFYGTFSELQSLRPSFSSKLMGYDTFDQFTEERRSSILTETLRRFSVDDSSAPWSKPKQSFRQTGEVGEKRKNSILNSFSSVRKISIVQKTPLCIDGESDDLQEKRLSLVPDSEQGEAALPRSNMIATGPTFPGRRRQSVLDLMTFTPNSGSSNLQRTRTSIRKISLVPQISLNEVDVYSRRLSQDSTLNITEEINEEDLKECFLDDVIKIPPVTTWNTYLRYFTLHKGLLLVLIWCVLVFLVEVAASLFVLWLLKNNPVNSGNNGTKISNSSYVVIITSTSFYYIFYIYVGVAD

>sample sequence three
MSTISKLKAGGILNRFSKDIAILDDFLPLTIFDFIQLVFIVIGAIIVVSALQPYIFLATVPGLVVFILLRAYFLHTAQQLKQLESEGRSPIFTHLVTSLKGLWTLRAFRRQTYFETLFHKALNLHTANWFMYLATLRWFQMRIDMIFVLFFIVVTFISILTTGEGEGTAGIILTLAMNIMSTLQWAVNSSIDTDSLMRSVSRVFKFIDIQTEESMYTQIIKELPREGSSDVLVIKNEHVKKSDIWPSGGEMVVKDLTVKYMDDGNAVLENISFSISPGQRVGLLGRTGSGKSTLLSAFLRMLNIKGDIEIDGVSWNSVTLQEWRKAFGVITQKVFIFSGTFRQNLDPNGKWKDEEIWKVADEVGLKSVIEQFPGQLNFTLVDGGYVLSHGHKQLMCLARSVLSKAKIILLDEPSAHLDPITYQVIRRVLKQAFAGCTVILCEHRIEAMLDCQRFLVIEESNVWQYDSLQALLSEKSIFQQAISSSEKM
`;
export default defineComponent({
    name: "ProteinPatternFind",
    components: {
        Select,
        Option,
        Input,
    },
    setup(props) {
        const regexp = ref('S[^S]{0,5}S');
        return {
            regexp
        };
    },
    render() {
        return (<Tool title={this.$t('app.tools.ProteinPatternFind.title')} desc={this.$t('app.tools.ProteinPatternFind.desc')} submit={proteinPattern} template={template} supportFormat={['.fasta', '.fas', '.fsa', '.fa', '.seq', '.FASTA', '.FAS', '.FSA', '.FA']} maxQuery={500000} valdiator={{
                regexp: this.regexp,
            }} scopedSlots={{
                default: () => (<div class="dna-pattern__input">
                            <i18n path="app.tools.ProteinPatternFind.input" tag="div">
                                {this.$t('app.tools.ProteinPatternFind.pattern')}
                                {'{0,5}'}
                            </i18n>
                            <Input v-model={this.regexp}/>
                        </div>),
            }}/>);
    }
});
