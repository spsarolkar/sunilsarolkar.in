import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ISLTestData } from "../projects/ISL-IndianSignLanguageTranslation/interfaces/isl_r2";

export const listCategories = async (): Promise<ISLTestData> => {
    try {
        const account_id=process.env.CF_ACCOUNT_ID;
        const r2_access_key=process.env.CF_R2_ACCESS_KEY;
        const r2_access_key_secret=process.env.CF_R2_ACCESS_KEY_SECRET;
        // console.log("account_id:", account_id);
        if (!account_id || !r2_access_key || !r2_access_key_secret) {
            console.error("Error fetching objects from R2: Missing environment variables");
          throw new Error('Missing environment variables');
        }

        // console.log("checkpoint 1");
        const S3 = new S3Client({
            region: "auto",
            endpoint: `https://${account_id}.r2.cloudflarestorage.com`,
            credentials: {
              accessKeyId: `${r2_access_key}`,
              secretAccessKey: `${r2_access_key_secret}`,
            },
          });
        //   console.log("checkpoint 2");
        const params = {
            Bucket: 'isl-test-videos',
            Prefix: ''
        };
        const command = new ListObjectsV2Command(params);
        const response = await S3.send(command);
        const islData: ISLTestData = {
        } as ISLTestData;
        response.Contents?.forEach(obj => {
            const parts = obj.Key!.split('/');
            if (parts.length >= 4) {
                const category = parts[1];
                const expression = parts[2];
                const filename = parts[3];
                if (!Object.keys(islData).includes(category)) {
                    
                    islData[category] = {};
                }
                if (!Object.keys(islData[category]).includes(expression)) {
                    
                    islData[category][expression] = [];
                }
                islData[category][expression].push(filename);
            }
        });
        // console.log("checkpoint 4");
        return islData;
    } catch (error) {
        console.error("Error fetching objects from R2:", error);
        throw error;
    }
};


export const getVideoUrl = async ({category="", expression="", filename=""}): Promise<string> => {
    try {
        const account_id=process.env.CF_ACCOUNT_ID;
        const r2_access_key=process.env.CF_R2_ACCESS_KEY;
        const r2_access_key_secret=process.env.CF_R2_ACCESS_KEY_SECRET;
        if (!account_id || !r2_access_key || !r2_access_key_secret) {
          throw new Error('Missing environment variables');
        }
        const S3 = new S3Client({
            region: "auto",
            endpoint: `https://${account_id}.r2.cloudflarestorage.com`,
            credentials: {
              accessKeyId: `${r2_access_key}`,
              secretAccessKey: `${r2_access_key_secret}`,
            },
          });

        const getSignedUrlCommand = new GetObjectCommand({ Bucket: 'isl-test-videos', Key: `openpose-test/${category}/${expression}/${filename}`});
        const url = await getSignedUrl(S3, getSignedUrlCommand, { expiresIn: 3600 });


        return url;
    } catch (error) {
        console.error("Error fetching objects from R2:", error);
        throw error;
    }
};

export const getTestData = async (): Promise<string> => {
    try {
        console.log("getTestData checkpoint 1");
        const account_id=process.env.CF_ACCOUNT_ID;
        const r2_access_key=process.env.CF_R2_ACCESS_KEY;
        const r2_access_key_secret=process.env.CF_R2_ACCESS_KEY_SECRET;
        if (!account_id || !r2_access_key || !r2_access_key_secret) {
          throw new Error('Missing environment variables');
        }
        const S3 = new S3Client({
            region: "auto",
            endpoint: `https://${account_id}.r2.cloudflarestorage.com`,
            credentials: {
              accessKeyId: `${r2_access_key}`,
              secretAccessKey: `${r2_access_key_secret}`,
            },
          });
          console.log("getTestData checkpoint 2");
        const getSignedUrlCommand = new GetObjectCommand({ Bucket: 'isl-test-videos', Key: `testing_cleaned.csv`});
        const url = await getSignedUrl(S3, getSignedUrlCommand, { expiresIn: 3600 });
        console.log("getTestData checkpoint 3");

        return url;
    } catch (error) {
        console.error("Error fetching objects from R2:", error);
        throw error;
    }
};