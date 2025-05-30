import Helper from '../shared/Helper';
import { operationResponse, ResponseObject, VehicleResponse, VehicleAPIResponse, BookingAPIResponse } from '../interface/Response.type';
import CommonUtil from '../shared/CommonUtil'

export class POSTRequest {
  private helper: Helper;
  private commonUtil : CommonUtil
  operationID: number;
  booking_ids!: number[];
  getAllBooking_uid!: string[];
  getVehicleid!: number | undefined;
  private operationResponse!: operationResponse;
  private responseObject!: ResponseObject;

  constructor() {
    this.helper = new Helper();
    this.commonUtil = new CommonUtil();
  }

  async createOperation() {
  const {year_month_day} = await this.commonUtil.getCurrentDate();
   this.operationResponse = await this.helper.postRequest("/",{
      time: `${year_month_day}T00:00:00+08:00`
    });
    this.operationID = this.operationResponse.operation_id;
  }

  async uploadOrder(filePath :string){
    const booking = await this.commonUtil.generateRandomUID(filePath);
    this.operationResponse = await this.helper.postRequest("/",
      {
        "operation_id": this.operationID,
        "bookings": booking
      })
    this.booking_ids = this.operationResponse.booking_ids
  }

  async updateBookingState() {
  const { listBooking_ids } = await this.getBooking_uid();
  const listBookingID = listBooking_ids.map(id => id.toString());

  const bookingAPIResponse: BookingAPIResponse = {
    objects: listBookingID.map((bookingId) => ({
      state: "ready",
      operation: `/operation/${this.operationID}`,
      resource_uri: `/booking/${bookingId}`
    }))
  };
  await this.helper.patchRequest('/', bookingAPIResponse);
}

  async bookingAssignment(){
    const bookingUids = this.getAllBooking_uid;
    const response = await this.helper.postRequest('/',
      {
        "operation_id": this.operationID,
        "booking_uids": bookingUids
      }
  );
  }

  async getBooking_uid(){
    
    this.responseObject = await this.helper.getRequest(`/`);
    this.getAllBooking_uid =  this.responseObject.objects
      .map(obj => String(obj.uid));

    const listBooking_ids: number[] = this.responseObject.objects
      .map(obj => obj.id);

    return {
      getAllBooking_uid: this.getAllBooking_uid, 
      listBooking_ids
    }
  }

  async getVehicleID(service_number: string):Promise<number>{

    const response = await this.helper.getRequest(
      `/`
    ) as VehicleAPIResponse;
    const vehicle_id = response.objects.find((item:VehicleResponse)=> item.service_number === service_number);

    if (!vehicle_id) {
      throw new Error(`Vehicle with service_number "${service_number}" not found.`);
    }
    this.getVehicleid = vehicle_id?.id;
    return this.getVehicleid;
  }

  async getNodeBooking(){
   /**
    * get the data.external_data
    */
  }

  
}

export default POSTRequest;