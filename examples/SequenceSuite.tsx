import { ref, defineComponent } from "@vue/composition-api";
import SequenceMenus from './components/Menus/Menus';
import './SequenceSuite.less';
export default defineComponent({
    name: "SequenceSuite",
    render() {
        return (<div class="sequence-suite">
                <SequenceMenus />
                <router-view class="sequence-suite__view"></router-view>
            </div>);
    }
});
