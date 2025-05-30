import * as path from 'path';
import {readFileSync, writeFileSync} from 'fs'
import { randomUUID } from 'crypto';

class CommonUtil{

  async dirPath(filepath:string):Promise<string>{
    const filePath = path.resolve(__dirname, '..', 'test-data/', filepath);
    return filePath;
  }

  async generateRandomUID(filepath: string){
    const raw = readFileSync(await this.dirPath(filepath), 'utf8');
    const data = JSON.parse(raw);

    const {year_month_day} = await this.getCurrentDate();
    data.forEach((item: any) => {
      item.uid = randomUUID();
      item.dropoff_time = `${year_month_day}T14:00:00+08:00`
      item.pickup_time = `${year_month_day}T20:00:00+08:00`
    });
    writeFileSync(await this.dirPath(filepath), JSON.stringify(data, null, 2), 'utf8');
    return data;
  }

  async getCurrentDate(){
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year_month_day = `${year}-${month}-${day}`;
    return {
      formattedDate,
      year_month_day
    };
  };
  
}

export default CommonUtil;
