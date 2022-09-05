import { defineComponent } from '@vue/composition-api';
import Tool from '../components/Tool/Tool';
// @ts-ignore
import { genbankToFasta } from '../scripts/genbank_fasta';
const template = `LOCUS       SUSFASCIN    2320 bp    mRNA            INV       14-MAR-2000
DEFINITION  Strongylocentrotus purpuratus fascin (FSCN1) mRNA, complete cds.
ACCESSION   L12047
VERSION     L12047.1  GI:161470
KEYWORDS    actin bundling protein; fascin.
SOURCE      Strongylocentrotus purpuratus.
  ORGANISM  Strongylocentrotus purpuratus
            Eukaryota; Metazoa; Echinodermata; Echinozoa; Echinoidea;
            Euechinoidea; Echinacea; Echinoida; Strongylocentrotidae;
            Strongylocentrotus.
REFERENCE   1  (bases 1 to 2320)
  AUTHORS   Kane,R.E.
  TITLE     Actin polymerization and interaction with other proteins in
            temperature-induced gelation of sea urchin egg extracts
  JOURNAL   J. Cell Biol. 71 (3), 704-714 (1976)
  MEDLINE   77051438
REFERENCE   2  (bases 1 to 2320)
  AUTHORS   Bryan,J. and Kane,R.E.
  TITLE     Separation and interaction of the major components of sea urchin
            actin gel
  JOURNAL   J. Mol. Biol. 125 (2), 207-224 (1978)
  MEDLINE   79091184
REFERENCE   3  (bases 1 to 2320)
  AUTHORS   Bryan,J., Edwards,R., Matsudaira,P., Otto,J. and Wulfkuhle,J.
  TITLE     Fascin, an echinoid actin-bundling protein, is a homolog of the
            Drosophila singed gene product
  JOURNAL   Proc. Natl. Acad. Sci. U.S.A. 90 (19), 9115-9119 (1993)
  MEDLINE   94022326
FEATURES             Location/Qualifiers
     source          1..2320
                     /organism="Strongylocentrotus purpuratus"
                     /db_xref="taxon:7668"
                     /dev_stage="larva"
     gene            1..2320
                     /gene="FSCN1"
     CDS             85..1575
                     /gene="FSCN1"
                     /function="actin bundling protein"
                     /note="putative"
                     /codon_start=1
                     /product="fascin"
                     /protein_id="AAC37183.1"
                     /db_xref="GI:161471"
                     /translation="MPAMNLKYKFGLVNSAGRYLTAEKFGGKVNASGATLKARQVWIL
                     EQEESSTISYLKAPSGNFLSADKNGNVYCSVEDRTEDADTGFEIELQPDGKWALKNVS
                     HQRYLACNGEELICSESSTSNPSANWTVQLAIHPQVCMKNVQHQRYAHLKTSEEGEDS
                     VVVDELVPWGADSTLTLVYLGKGKYGLEAFNGKFVQTDGQLAGTANEQTQFTLIFTSG
                     HLVLRDNNGRHLGVDSGTRVLKSSKPGLTKANYFILEDSCPQGAFEFGGKYASLKQGE
                     DVSFKLLVDEDIEDTETFQLEFVETDKYAIRVCDPKKNSRDAKFWKTVAAGIQANGNS
                     KDQTDCQFSVEYNGNDMHVRAPGGKYVSVRDNGHLFLQDSPKDFIFRLLNRPKLVLKC
                     PHGFVGMKEGKAEVACNRSNFDVFTVTYKEGGYTIQDSCGKYWSCDDSSRIVLGEAAG
                     TFFFEFHELSKFAIRAESNGMLIKGEQSGLFTANGSEVSKDTLWEF"
     polyA_signal    2155..2160
                     /gene="FSCN1"
BASE COUNT      699 a    510 c    528 g    583 t
ORIGIN
        1 acttgaaagt ggataaaatc gactgatacc aaaacaacat tgttttacag aagtggtcgt
       61 ttgaggacat caacatattt cacaatgcct gctatgaatt taaaatacaa atttggcctg
      121 gtcaactcgg ccggcagata cctcactgct gagaagtttg gtggcaaagt caatgcctca
      181 ggagcaacgt taaaagccag gcaagtatgg atcctagagc aagaagagag cagcacgatc
      241 agctacttga aggcgccctc tggtaacttc ctctctgcag ataaaaacgg taacgtctat
      301 tgcagtgttg aggacaggac ggaggacgcg gatacaggat tcgagatcga gttgcaaccc
      361 gatggtaaat gggccctcaa gaatgtttct caccagaggt acctagcttg caatggtgag
      421 gagctgatct gcagtgaatc cagcaccagc aacccctcag caaactggac tgtccagctg
      481 gccatccatc cacaggtctg catgaagaac gtccagcacc aacgctacgc acatctcaaa
      541 accagtgagg agggtgaaga cagcgtggtt gtagacgaat tggttccctg gggagctgat
      601 tccacactca ctcttgtcta cctgggcaaa ggaaagtacg gccttgaggc cttcaacgga
      661 aagtttgtcc aaaccgacgg acagcttgct ggcacagcca acgaacagac gcagttcaca
      721 ctcatcttca catccggtca cctggtacta agggacaaca atggacgtca cttaggagtg
      781 gacagtggaa ccagggtctt gaagtcctcc aagcctggac tgacgaaagc caattacttc
      841 atcctagagg atagctgtcc acaaggtgcc ttcgaatttg gtggcaaata tgcatcgtta
      901 aagcaaggcg aagatgtttc attcaagctt cttgttgacg aagatatcga agacacagag
      961 accttccagt tggagttcgt tgaaaccgac aagtatgcca tcagggtatg tgaccccaag
     1021 aagaactcca gagatgctaa gttctggaag accgtcgctg ctggtatcca ggctaacggc
     1081 aactcaaagg accagacgga ctgtcaattc tctgtcgaat acaacggcaa cgacatgcat
     1141 gtgcgtgctc caggaggcaa gtatgttagt gtccgtgaca acggccatct cttccttcag
     1201 gattcaccca aagacttcat cttccgtctg ctcaaccgac ccaagctggt gctcaagtgc
     1261 cctcatggat tcgtgggcat gaaggagggc aaggctgagg tcgcctgcaa ccgatcaaac
     1321 tttgatgtct tcactgtcac ctacaaggaa ggcggataca ctatccaaga ctcctgtggc
     1381 aagtactggt cttgtgatga cagtagccgc atcgttcttg gagaggcagc aggtactttc
     1441 ttcttcgagt tccatgagct ctccaagttt gctatccgag cagaaagcaa cggcatgttg
     1501 atcaagggcg agcagagtgg cttgtttacc gccaatggtt ccgaggtctc aaaggacaca
     1561 ctgtgggaat tctaaacaaa ttgggcttga aagaagccaa atccaaatca gaagtagagt
     1621 agctgacaag ccagccactc tatctattat atcaattgca aatattgtac atttttttaa
     1681 tacaaaaata ttttcaaagg tgcataataa ttatttcata ctctggtggg atctttagga
     1741 tcatattttc tcattgcctt ggcatactga cttccattat ccctcatttt ttaaaaggta
     1801 aattgatcac ttaatatcaa ctgaaaacga aatggaagta ggtctctgga aatttagaag
     1861 aatagatgac tatccagtat attcaaatat ttgttgaacc tgtctcaaaa aaaccccata
     1921 aaaaaccctc tgttttgtgc tgtctcatag ccataaatag agatcaattc tggtggtata
     1981 tgctacttaa aatcaggctt gaaatagaat aaatggaatg gaatggattt tcaaaaagat
     2041 ttggaatttt aaatttgcag ccagtgtccg tgacaactct tgcataccag aagcactaaa
     2101 cagtctctgc cgcaccgctc gcccaggtgt attgttgtga ctgtactttt gaacaataaa
     2161 acagatcttt tcgtcaagtt tggatataaa agtggattga aatgcacgaa tagattcgac
     2221 ttgtataggg catggtggac attgatttta cagatacttt caatataccg gtaaaaatca
     2281 atcatataga aaatgaaaac agggtgtaat atctcaaata
//

`;
export default defineComponent({
    name: 'SequenceSuite',
    render() {
        return (<Tool title={this.$t('app.tools.GenBank.title')} desc={this.$t('app.tools.GenBank.desc')} supportFormat={['.txt', '.TXT']} submit={genbankToFasta} template={template}/>);
    },
});
