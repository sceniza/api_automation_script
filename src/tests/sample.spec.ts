import POSTRequest from "../controllers/Request";

test('Postive Scenario', async()=>{
  const postRequest = new POSTRequest();
  await postRequest.createOperation();
  await postRequest.uploadOrder("uploadOrder.json")
  await postRequest.getBooking_uid();
  await postRequest.updateBookingState();
  await postRequest.bookingAssignment();
})