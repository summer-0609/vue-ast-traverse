import { defineComponent } from '@vue/composition-api';
import Tool from '../components/Tool/Tool';
// import './SequenceSuite.less'
// @ts-ignore
import { threeToOne } from '../scripts/three_to_one';
const template = `>sequence 1
AlaCysAspGluPheGlyHisIleLysLeuMet

>sequence 2
AsnProGlnArgSerThrValTrpTyr***`;
export default defineComponent({
    name: 'ThreeToOne',
    render() {
        return (<Tool title={this.$t('app.tools.ThreeToOne.title')} desc={this.$t('app.tools.ThreeToOne.desc')} submit={threeToOne} template={template} supportFormat={['.fasta', '.fas', '.fsa', '.fa', '.seq', '.FASTA', '.FAS', '.FSA', '.FA']} maxQuery={100000}/>);
    },
});
