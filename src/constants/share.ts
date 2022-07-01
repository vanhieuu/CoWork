import { sendNotification } from "./telegram";

const handler = async (request:any,response:any) =>{
        switch (request.method) {
            case 'POST':
                const {text,parseMode} = request.body;
                await sendNotification(text,parseMode)
                response.status(200).json({message:'Send Task successfully'})
                break;
            default:
                response.status(405).end('This method is not allowed')
                break;
        }
}
export default handler