import { defineComponent } from "@vue/composition-api";
import { Button, Icon, Toast } from 'patsnap-ui';
import { get, isNil, isString, some } from 'lodash';
import dayjs from 'dayjs';
import { UPLOAD_SUPPORT_FORMAT, LIMIT_FILE_SIZE, PROMPT_MESSAGES } from '@/constants';
import { readFASTAFile } from '@/utils/sequence';
import DragUpload from '@/views/Search/components/DragUpload';
import downLoadTools from '../../scripts/downloadTools';
import './Tool.less';
const uploadEnable = !!window.FileReader;
const prevent = (e: Event) => {
    e.preventDefault();
};
export default defineComponent({
    name: "Tool",
    components: {
        Button,
        Icon,
    },
    props: {
        title: String,
        desc: String,
        maxQuery: { type: Number, default: 200000 },
        template: String,
        submit: Function,
        valdiator: Object,
        supportFormat: { type: Array, default: UPLOAD_SUPPORT_FORMAT }
    },
    setup(props) {
        const resultInput = ref('');
        const isUploadDrag = ref(false);
        const $_fileInput = ref<unknown>(undefined);
        const $_message = ref<any>();
        const editorInput = ref<string>(this.template);
        return {
            resultInput,
            isUploadDrag,
            $_fileInput,
            $_message,
            editorInput
        };
    },
    methods: {
        createInput() {
            // 初始化 upload 用的 input 元素
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('multiple', 'true');
            // @ts-ignore
            input.style.visible = 'hidden';
            input.style.width = '0';
            input.style.height = '0';
            input.addEventListener('change', (e) => this.handleFileInputChange(e as InputEvent));
            input.setAttribute('accept', this.supportFormat.join(','));
            this.$_fileInput = input;
        },
        isCorrectFile(fileName: string) {
            const fastaSuffixs = this.supportFormat;
            return some(fastaSuffixs, (v) => fileName.lastIndexOf(v) !== -1);
        },
        selectFile() {
            // 每次都创建新的 input，为了防止两次上传同一个文件，不会触发 change 事件
            this.createInput();
            const input = this.$_fileInput as HTMLInputElement;
            if (!input) {
                return;
            }
            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);
        },
        handleFileInputChange(e: InputEvent) {
            //@ts-ignore
            this.uploadFile(e.target?.files);
        }
        //@ts-ignore
        ,
        //@ts-ignore
        prompt({ message, type = 'warning', duration, args }) {
            if (isNil(message)) {
                return;
            }
            if (this.$_message) {
                this.$_message.close();
            }
            // @ts-ignore
            this.$_message = Toast({
                showClose: type === 'warning',
                onClose: () => {
                    this.$_message = null;
                },
                type,
                message: isString(message) ? this.$t(message, args) : this.$t(`Search.message.${message}`, args),
                duration: duration || (type === 'error' ? 5000 : 3000),
            });
        },
        uploadFile(fileList: FileList) {
            // @ts-ignore
            if (!uploadEnable || !fileList || !fileList.length) {
                return;
            }
            let size = 0;
            const filenames: string[] = [];
            const sequencesPromise: Promise<any>[] = [];
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const name = file.name;
                if (size + file.size > LIMIT_FILE_SIZE) {
                    //@ts-ignore
                    this.prompt({
                        message: PROMPT_MESSAGES.fileOverSize,
                        args: [(LIMIT_FILE_SIZE / 1024 / 1024).toFixed(0)],
                    });
                    return;
                }
                if (this.isCorrectFile(name)) {
                    size += file.size;
                    filenames.push(name);
                    sequencesPromise.push(readFASTAFile(file));
                }
            }
            // 有不符合文件名的文件
            if (filenames.length !== fileList.length) {
                //@ts-ignore
                this.prompt({ message: 'app.tools.message', args: [this.supportFormat[0].slice(1).toUpperCase()] });
                if (!filenames.length) {
                    // 所有都不符合就退出
                    return;
                }
            }
            const insertUploadFile = () => {
                Promise.all(sequencesPromise)
                    .then((sequences) => {
                    this.editorInput = sequences.join('\n\n');
                })
                    .catch(() => {
                    // ignore
                });
            };
            insertUploadFile();
        },
        handleDrop(e: Event) {
            prevent(e);
            const files = get(e, 'dataTransfer.files');
            this.$emit('upload', files);
        },
        transformInput() {
            this.resultInput = this.submit(this.editorInput, this.valdiator);
        },
        clearInput() {
            this.editorInput = '';
            this.resultInput = '';
        },
        copyResultInput() {
            const el = document.createElement('textarea');
            el.value = this.resultInput;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            Toast({
                type: 'success',
                message: this.$t('app.tools.copySuccess'),
            });
        }
    },
    render() {
        return (<div>
                <div class="sequence-suite__container">
                    <div class="sequence-suite__title">{this.title}</div>
                    <div class="sequence-suite__desc">{this.desc}</div>
                    <div class="sequence-suite__content" onDragenter={() => (this.isUploadDrag = true)} onDragover={prevent} onDrop={this.handleDrop}>
                        {uploadEnable && (<div>
                                <Button size="small" type="alternative" onClick={this.selectFile}>
                                    <Icon name="SolidUpload"></Icon>
                                    {this.$t('Search.btns.upload')}
                                </Button>
                                <span class="sequence-suite__extension">{this.supportFormat[0]}</span>
                            </div>)}
                        <div class="sequence-suite__textarea">
                            <textarea v-model={this.editorInput} spellcheck="false" autocomplete="off" maxlength={this.maxQuery}/>
                            <div class="sequence-suite__prompt">
                                <div class="sequence-suite__prompt-example" onClick={() => (this.editorInput = this.template)}>
                                    {this.$t('app.tools.btns.example')}
                                </div>
                                <div class="sequence-suite__prompt-count">
                                    {this.editorInput.length > this.maxQuery ? this.maxQuery : this.editorInput.length}/
                                    {this.maxQuery}
                                </div>
                            </div>
                        </div>
                        <DragUpload fileFormat={this.supportFormat[0].slice(1)} visible={this.isUploadDrag} on={{ ['update:visible']: (flag: boolean) => (this.isUploadDrag = flag) }} onUpload={this.uploadFile}/>
                    </div>
                    {this.$scopedSlots.default?.({ valdiator: this.valdiator })}
                    <div class="sequence-suite__btns">
                        <Button disabled={!this.editorInput} type="alternative" size="small" onClick={this.clearInput}>
                            {this.$t('Search.btns.clear')}
                        </Button>
                        <Button disabled={!this.editorInput} type="primary" size="small" onClick={this.transformInput}>
                            {this.$t('globals.btns.submit')}
                        </Button>
                    </div>

                    <div class="sequence-suite__result">
                        <textarea ref="textarea" readonly v-model={this.resultInput} spellcheck="false" autocomplete="off"/>
                        <div class="sequence-suite__handler">
                            <Button disabled={!this.resultInput} type="alternative" size="small" onClick={this.copyResultInput}>
                                <Icon colour={this.resultInput ? '#495973' : '#BCC2CC'} name="SolidCopy"></Icon>
                                {this.$t('app.tools.btns.copy')}
                            </Button>
                            <Button disabled={!this.resultInput} type="alternative" size="small" onClick={() => downLoadTools.saveTXT(this.resultInput, `${this.title} ${dayjs().format('YYYY-MM-DD')}`)}>
                                <Icon colour={this.resultInput ? '#495973' : '#BCC2CC'} name="SolidExport"></Icon>
                                {this.$t('app.tools.btns.export')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>);
    }
});
