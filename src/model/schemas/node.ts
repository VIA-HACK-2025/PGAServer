import mongoose, { Schema } from 'mongoose';

const NodeSchema: Schema = new Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Node",
        default: undefined,
    },
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        default: undefined,
    },
    info: {
        type: {
            title: {
                type: String,
                required: false,
            },
            icon: {
                type: String,
                required: false,
            },
        },
        required: false,
    },
});


const NodeModel = mongoose.model('Node', NodeSchema);

export { NodeModel };
