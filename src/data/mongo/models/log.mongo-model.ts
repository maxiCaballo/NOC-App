import mongoose, { Model, Schema } from 'mongoose';

export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

const logSchema = new Schema({
	message: { type: String, required: true },
	origin: String,
	level: {
		type: String,
		enum: {
			values: ['low', 'medium', 'high'],
			message: '{VALUE} is not a valid type',
		},
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export const LogMongoModel = mongoose.model('Log', logSchema);
