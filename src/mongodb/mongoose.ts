import { log } from "../utils/log";

import mongoose from 'mongoose';

export async function dbconnect() {
	await mongoose.connect(`${process.env['DBURL']}`)
	log('connect to mongodb')

}