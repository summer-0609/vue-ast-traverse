import { defineComponent } from '@vue/composition-api';
import Tool from '../components/Tool/Tool';
// import './SequenceSuite.less'
// @ts-ignore
import { emblToFasta } from '../scripts/embl_fasta';
const template = `ID   AF177870   standard; DNA; INV; 3123 BP.
XX
AC   AF177870;
XX
SV   AF177870.1
XX
DT   02-NOV-1999 (Rel. 61, Created)
DT   17-AUG-2000 (Rel. 64, Last updated, Version 2)
XX
DE   Caenorhabditis sp. CB5161 putative PP2C protein phosphatase FEM-2 (fem-2)
DE   gene, complete cds.
XX
KW   .
XX
OS   Caenorhabditis sp. CB5161
OC   Eukaryota; Metazoa; Nematoda; Chromadorea; Rhabditida; Rhabditoidea;
OC   Rhabditidae; Peloderinae; Caenorhabditis.
XX
RN   [1]
RP   1-3123
RA   Stothard P.M., Hansen D., Pilgrim D.;
RT   "Isolation of PP2C sequences using degenerate-oligo PCR";
RL   Unpublished.
XX
RN   [2]
RP   1-3123
RA   Stothard P.M., Hansen D., Pilgrim D.;
RT   ;
RL   Submitted (17-AUG-1999) to the EMBL/GenBank/DDBJ databases.
RL   Biological Sciences, University of Alberta, Edmonton, AB T6G-2E9, Canada
XX
DR   SPTREMBL; Q9U6S2; Q9U6S2.
XX
FH   Key             Location/Qualifiers
FH
FT   source          1..3123
FT                   /db_xref="taxon:135651"
FT                   /organism="Caenorhabditis sp. CB5161"
FT                   /strain="CB5161"
FT   mRNA            join(<265..402,673..781,911..1007,1088..1215,1377..1573,
FT                   1866..2146,2306..2634,2683..>2855)
FT                   /gene="fem-2"
FT                   /product="putative FEM-2 protein phosphatase type 2C"
FT   CDS             join(265..402,673..781,911..1007,1088..1215,1377..1573,
FT                   1866..2146,2306..2634,2683..2855)
FT                   /codon_start=1
FT                   /db_xref="SPTREMBL:Q9U6S2"
FT                   /note="possible sex-determining protein"
FT                   /gene="fem-2"
FT                   /product="putative PP2C protein phosphatase FEM-2"
FT                   /protein_id="AAF04557.1"
FT                   /translation="MSDSLNHPSSSTVHADDGFEPPTSPEDNNKKPSLEQIKQEREALF
FT                   TDLFADRRRSARSVIEEAFQNELMSAEPVQPNVPNPHSIPIRFRHQPVAGPAHDVFGDA
FT                   VHSIFQKIMSRGVNADYSHWMSYWIALGIDKKTQMNYHMKPFCKDTYATEGSLEAKQTF
FT                   TDKIRSAVEEIIWKSAEYCDILSEKWTGIHVSADQLKGQRNKQEDRFVAYPNGQYMNRG
FT                   QSDISLLAVFDGHGGHECSQYAAAHFWEAWSDAQHHHSQDMKLDELLEKALETLDERMT
FT                   VRSVRESWKGGTTAVCCAVDLNTNQIAFAWLGDSPGYIMSNLEFRKFTTEHSPSDPEEC
FT                   RRVEEVGGQIFVIGGELRVNGVLNLTRALGDVPGRPMISNKPDTLLKTIEPADYLVLLA
FT                   CDGISDVFNTSDLYNLVQAFVNEYDVEDYHELARYICNQAVSAGSADNVTVVIGFLRPP
FT                   EDVWRVMKTDSDDEESELEEEDDNE"
XX
SQ   Sequence 3123 BP; 986 A; 605 C; 597 G; 935 T; 0 other;
     gaacgcgaat gcctctctct ctttcgatgg gtatgccaat tgtccacatt cactcgtgtt        60
     gcctcctctt tgccaacacg caagacacca gaaacgcgtc aaccaaagag aaaaagacgc       120
     cgacaacggg cagcactcgc gagagacaaa ggttatcgcg ttgtgttatt atacattcgc       180
     atccgggtca actttagtcc gttgaacatg cttcttgaaa acctagttct cttaaaataa       240
     cgttttagaa gttttggtct tcagatgtct gattcgctaa atcatccatc gagttctacg       300
     gtgcatgcag atgatggatt cgagccacca acatctccgg aagacaacaa caaaaaaccg       360
     tctttagaac aaattaaaca ggaaagagaa gcgttgttta cggttagtta cctattagct       420
     gcaagttttg aaaaagcgga atctgtaaaa agcggaatct gtaaaaaaaa catctaagga       480
     ataattctga aaagaaaaag tttctaaatg ttaatcggaa tccaattttt atgaaattat       540
     ttaaaaaaaa actaaaatta gtttctaaaa aatttttcta aagtaattgg accatgtgaa       600
     ggtacaccca cttgttccaa tatgccatat ctaactgtaa aataatttga ttctcatgag       660
     aatatttttc aggatctatt cgcagatcgt cgacgaagcg ctcgttctgt gattgaagaa       720
     gctttccaaa acgaactcat gagtgctgaa ccagtccagc caaacgtgcc gaatccacat       780
     tgtgagttgg aaatttttat ttgataacca agagaaaaaa agttctacct ttttttcaaa       840
     aacctttcca aaaatgattc catctgatat aggattaaga aaaatatttt ccgaaatctc       900
     tgcttttcag cgattcccat tcgtttccgt catcaaccag ttgctggacc tgctcatgat       960
     gttttcggag acgcggtgca ttcaattttt caaaaaataa tgtccaggta tacactattt      1020
     ttgcatattt ttcttgccaa atttggtcaa aaaccgtagt acaacccaaa aagtttcttc      1080
     atttcagagg agtgaacgcg gattatagtc attggatgtc atattggatc gcgttgggaa      1140
     tcgacaaaaa aacacaaatg aactatcata tgaaaccgtt ttgcaaagat acttatgcaa      1200
     ctgaaggctc cttaggtagg ttagtctttt ctaggcacag aagagtgaga aaattctaaa      1260
     tttctgagca gtctgctttt tgttttcctt gagtttttac ttaaagctct taaaagaaat      1320
     ctaggcgtga agttcgagcc ttgtaccata ccacaacagc attccaaatg ttacagaagc      1380
     gaaacaaaca tttactgata aaatcaggtc agctgttgag gaaattatct ggaagtccgc      1440
     tgaatattgt gatattctta gcgagaagtg gacaggaatt catgtgtcgg ccgaccaact      1500
     gaaaggtcaa agaaataagc aagaagatcg ttttgtggct tatccaaatg gacaatacat      1560
     gaatcgtgga caggttagtg cgaatcgggg actcaagatt tactgaaata gtgaagagaa      1620
     aacaaaagaa aactatattt tcaaaaaaaa tgagaactct aataaacaga atgaaaaaca      1680
     ttcaaagcta cagtagtatt tccagctgga gtttccagag ccaaaaaaat gcgagtatta      1740
     ctgtagtttt gaaattggtt tctcacttta cgtacgattt tttgattttt ttttcagact      1800
     cttcatatga aaaaaaatca tgttttctcc tttacaagat ttttttgatc tcaaaacatt      1860
     tccagagtga catttcactt cttgcggtgt tcgatgggca tggcggacac gagtgctctc      1920
     aatatgcagc tgctcatttc tgggaagcat ggtccgatgc tcaacatcat cattcacaag      1980
     atatgaaact tgacgaactc ctagaaaagg ctctagaaac attggacgaa agaatgacag      2040
     tcagaagtgt tcgagaatct tggaaaggtg gaaccactgc tgtctgctgt gctgttgatt      2100
     tgaacactaa tcaaatcgca tttgcctggc ttggagattc accagggtaa tcaatttttt      2160
     tttagttttt ggaactttac gtcccgaaaa attattcctt tatcacctaa ttcctacagt      2220
     aacccaagct ccgaattaaa taaagttaaa gcgtggtata cacataaaaa taagaaaaaa      2280
     ttgttcatga aatccatttt tccagttaca tcatgtcaaa cttggagttc cgcaaattca      2340
     ctactgaaca ctccccgtct gacccggagg aatgtcgacg agtcgaagaa gtcggtggcc      2400
     agatttttgt gatcggtggt gagctccgtg tgaatggagt actcaacctg acgcgagcac      2460
     taggagacgt acctggaaga ccaatgatat ccaacaaacc tgatacctta ctgaagacga      2520
     tcgaacctgc ggattatctt gttttgttgg cctgtgacgg gatttctgac gtcttcaaca      2580
     ctagtgattt gtacaatttg gttcaggctt ttgtcaatga atatgacgta gaaggtatca      2640
     aactgatcgt ttttcacatc acaaaattct tgaattttcc agattatcac gaacttgcac      2700
     gctacatttg caatcaagca gtttcagctg gaagtgctga caatgtgaca gtagttatag      2760
     gtttcctccg tccaccagaa gacgtttggc gtgtaatgaa aacagactcg gatgatgaag      2820
     agagcgagct cgaggaagaa gatgacaatg aatagtttat tgcaagtttt ccaaaacttt      2880
     tccaatttcc ctgggtattg attagcatcc atatcttacg gcgattatat caattgtaac      2940
     attatttctg tttctccccc cacctctcaa attttcaaat gacccttttt cttttcgtct      3000
     acctgtatcg ttttccattc atctcccccc ctccactgtg gtatatcatt ttgtcattag      3060
     aaagtattat tttgattttc attggcagta gaagacaaca ggatacagaa gaggttttca      3120
     cag                                                                    3123
//
`;
export default defineComponent({
    name: 'SequenceSuite',
    render() {
        return (<Tool title={this.$t('app.tools.BMEL.title')} desc={this.$t('app.tools.BMEL.desc')} supportFormat={['.txt', '.TXT']} submit={emblToFasta} template={template}/>);
    },
});
