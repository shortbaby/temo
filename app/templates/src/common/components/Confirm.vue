
<template>
    <div v-show="show">
        <modal :show.sync="show" effect="fade" :width="width">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">
                    <span class="icon-confirm-title"></span>
                    <slot name="title-txt"></slot>
                </h4>
            </div>
            <div slot="modal-body" class="modal-body">
                <span class="icon-confirm-info"></span>
                <slot name="confirm-msg"></slot>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button type="button" class="btn btn-success" @click='ok()'>确定</button>
                <button type="button" class="btn btn-default" @click='hide()'>取消</button>
            </div>
        </modal>
    </div> 
</template>

<script>
    import Modal from '../../../dep/vue-strap/src/Modal.vue';
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
                default: 500
            },
            command: {
                type: String,
                default: ''
            }
        },
        components: {
            Modal: Modal
        },
        methods: {
            hide() {
                dispatch('HIDE_CONFIRM');
            },
            ok() {
                this.hide();
                if (this.command) {
                    let command = this.command;
                    this.$root.$broadcast(command);
                }
                return false;
            }
        }
    }
</script>
<style lang="sass">
    .modal-footer {
        .btn {
            outline: none;
            &:active {
                outline: none;
            }
        }
    }
</style>