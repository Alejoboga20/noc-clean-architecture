import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	origin: {
		type: String,
		default: 'undefined',
	},
	level: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'low',
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export const LogModel = mongoose.model('log', logSchema);
