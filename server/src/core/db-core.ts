import db from "../db/db";
import CreateLogCtx from "../logger";
const logger = CreateLogCtx("db-core.ts");
import { integer } from "kamaitachi-common";

export async function GetNextCounterValue(counterName: string): Promise<integer> {
    const sequenceDoc = await db.counters.findOneAndUpdate(
        {
            counterName,
        },
        {
            $inc: {
                value: 1,
            },
        },
        {
            returnOriginal: true,
        }
    );

    if (!sequenceDoc) {
        logger.error(`Could not find sequence document for ${counterName}`);
        throw new Error(`Could not find sequence document for ${counterName}.`);
    }

    return sequenceDoc.value;
}
