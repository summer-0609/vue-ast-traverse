import { defineComponent } from '@vue/composition-api';
import Tool from '../components/Tool/Tool';
// import './SequenceSuite.less'
// @ts-ignore
import { oneToThree } from '../scripts/one_to_three';
const template = `>sequence 1
ACDEFGHIK

>sequence 2
LMNPQRSTVWY*`;
export default defineComponent({
    name: 'OneToThree',
    render() {
        return (<Tool title={this.$t('app.tools.OneToThree.title')} desc={this.$t('app.tools.OneToThree.desc')} submit={oneToThree} template={template} supportFormat={['.fasta', '.fas', '.fsa', '.fa', '.seq', '.FASTA', '.FAS', '.FSA', '.FA']} maxQuery={100000}/>);
    },
});
