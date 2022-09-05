<template>
    <div class="search-row">
        <div class="refine-search-button" @click="showRefinePane" :style="{ width: boxWidth + 'px' }">
            <div
                :class="{ 'query-input': true, 'query-input--placeholder': !pq, 'query-input--not-allowed': noResults }"
            >
                {{ pq ? pq : $t('Results.tpls.refineSearchPlaceholder') }}
            </div>
            <div :class="{ 'append-btn': true, 'append-disable-btn': noResults && !pq }">
                <i class="base-icon-search" />
                {{ $t('Results.btns.refineSearch') }}
            </div>
        </div>
        <Button
            class="sequences-to-patents pull-right"
            type="primary"
            @click="toAanlytics"
            :disabled="!paginationSequence.total"
        >
            <i class="base-icon-patsnap-logo-analytics-search" />
            {{ $t('Results.btns.toPatents') }}
        </Button>
    </div>
</template>

<script>
import { Button } from 'element-ui'
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'

export default {
    props: {
        pq: {
            type: String,
            default: '',
        },
        noResults: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Button,
    },
    data() {
        return {
            windowWidth: window.innerWidth,
        }
    },
    computed: {
        ...mapGetters(['paginationSequence']),
        boxWidth() {
            return this.windowWidth - 490
        },
    },
    methods: {
        // show refine pane
        // 没有结果并且搜索框不为空，或者有结果则显示弹窗
        showRefinePane() {
            if ((this.noResults && this.pq) || !this.noResults) {
                this.$emit('show-refine-pane')
            }
        },
        // direct to analytics
        toAanlytics() {
            this.$emit('to-analytics')
        },
        updateWindowWidth: debounce(function updateWindowWidth() {
            this.windowWidth = window.innerWidth
        }, 20),
    },
    mounted() {
        window.addEventListener('resize', this.updateWindowWidth)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateWindowWidth)
    },
}
</script>

<style lang="scss" scoped>
.search-row {
    position: relative;
    height: 37px;
    width: 100%;
    .refine-search-button {
        position: relative;
        display: inline-block;
        cursor: pointer;
        height: 36px;
        line-height: 34px;
        font-size: 0;
        min-width: 760px;
        .query-input {
            display: inline-block;
            border: 1px solid #d2d2d2;
            border-radius: 5px 0 0 5px;
            border-right: none;
            padding: 0 10px;
            background-color: #f5f5f5;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: calc(100% - 165px);
            &--placeholder {
                color: #999;
            }
            &--not-allowed {
                cursor: not-allowed;
            }
        }
        .append-btn {
            display: inline-block;
            font-size: 14px;
            width: 158px;
            height: 100%;
            text-align: center;
            color: #fff;
            background-color: #2596db;
            border-color: #2596db;
            border-radius: 0 5px 5px 0;
            vertical-align: top;
        }
        .append-disable-btn {
            background-color: #92cbed;
            border-color: #92cbed;
            cursor: not-allowed;
        }
    }
    .sequences-to-patents {
        width: 145px;
        height: 36px;
        color: #fff;
    }
    .sequences-to-patents:not(:disabled) {
        background-color: #75bb00;
        border-color: #75bb00;
    }
    .pull-right {
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>
