import { ref, defineComponent } from "@vue/composition-api";
import { Select, Option } from 'element-ui';
import Tool from '../components/Tool/Tool';
// @ts-ignore
import { revComp } from '../scripts/rev_comp';
const template = `>Sample sequence 1
garkbdctymvhu

>Sample sequence 2
ctymvhgarkbda

>Sample sequence 2
ccccccccccga`;
export default defineComponent({
    name: "ReverseComplement",
    components: {
        Select,
        Option,
    },
    setup(props) {
        const reverse = ref('reverse-complement');
        return {
            reverse
        };
    },
    render() {
        const options = [
            { value: 'reverse-complement', label: this.$t('app.tools.ReverseComplement.revComp') },
            { value: 'reverse', label: this.$t('app.tools.ReverseComplement.rev') },
            { value: 'complement', label: this.$t('app.tools.ReverseComplement.comp') },
        ];
        return (<Tool title={this.$t('app.tools.ReverseComplement.title')} desc={this.$t('app.tools.ReverseComplement.desc')} submit={revComp} template={template} supportFormat={['.fasta', '.fas', '.fsa', '.fa', '.seq', '.FASTA', '.FAS', '.FSA', '.FA']} maxQuery={100000} valdiator={{
                reverse: this.reverse,
            }} scopedSlots={{
                default: () => (<div class="filter-dna__select">
                            <Select class="filter-dna__select-item" v-model={this.reverse}>
                                {options.map((option) => (<Option label={option.label} value={option.value}></Option>))}
                            </Select>
                        </div>),
            }}/>);
    }
});
