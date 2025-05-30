export interface operationResponse{
  operation_id: number;
  booking_ids: number[];
  booking_uid: string
}

export interface NodeObject{
  uid: number,
  id:number
}

export interface ResponseObject{
  objects: NodeObject[];
}

export interface VehicleResponse{
  id:number;
  service_number: string
}

export interface VehicleAPIResponse{
  objects: VehicleResponse[];
}


export interface BookingObject {
  state: string;
  operation: string;
  resource_uri: string;
}

export interface BookingAPIResponse {
  objects: BookingObject[];
}
