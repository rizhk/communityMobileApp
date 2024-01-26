import { faker } from "@faker-js/faker";
import { ActivityFormValues, ActivityItem } from "../types/activity";
import { postAxiosAPI, postAxiosApiFormData } from "../api/request";
import FormData from "form-data";

// Mock FormData
function FormDataMock(this: { append: (name: string, value: any) => void }) {
  this.append = jest.fn();
}

global.FormData = FormDataMock as any;

let userToken: string; //to test authenticated requests

const createRandomActivity = ({ name = "Test Activity" }: { name: string }): ActivityFormValues => {
  const startDate = faker.date.soon();
  const additionalHours = faker.number.int({ min: 1, max: 3 });
  const endDate = new Date(startDate.getTime() + additionalHours * 60 * 60 * 1000); // Convert hours to milliseconds

  return {
    name: name,
    maxParticipants: faker.number.int({ min: 1, max: 100 }),
    latitude: faker.number.float({
      min: 46.519653,
      max: 46.802071,
      precision: 0.00001,
    }),
    longitude: faker.number.float({
      min: 6.632273,
      max: 7.151756,
      precision: 0.00001,
    }),
    startDate: startDate,
    endDate: endDate,
    author: faker.number.int({ min: 170, max: 180 }),
    description: faker.lorem.paragraph(),
    participants: faker.helpers.arrayElements([170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180], {
      min: 0,
      max: 6,
    }),
    sport: faker.number.int({ min: 1, max: 100 }),
  } as ActivityFormValues;
};

describe("Actuality API", () => {
  let activityId: number;
  it("Create an activity", async () => {
    const activityData: ActivityFormValues = createRandomActivity({
      name: "Activity Test Form",
    });

    const result = await postAxiosAPI(
      "/activities/post",

      {
        data: activityData,
      }
    );
    expect(result.status).toBe(201);

    const activity = result.data;
    expect(activity?.id).toBeDefined();
    activityId = activity.id;

    expect(activity).toMatchObject<any>({
      id: expect.any(Number),
      description: activityData.description,
      latitude: activityData.latitude,
      longitude: activityData.longitude,
      startDate: activityData.startDate.toISOString(),
      endDate: activityData.endDate.toISOString(),
      maxParticipants: activityData.maxParticipants,
    });
  });
  it("Create an activity with FormData", async () => {
    const activityData: ActivityFormValues = createRandomActivity({
      name: "Activity Test Form Data",
    }); // Assuming this function returns valid activity data
    const formData = new FormData();
    formData.append("data", JSON.stringify(activityData));

    const result = await postAxiosApiFormData("/activities/post", formData as any);

    expect(result?.status).toBe(201);
    const activity = result.data;
    expect(activity).toMatchObject<any>({
      // id: expect.any(Number),
      description: activityData.description,
      latitude: activityData.latitude,
      longitude: activityData.longitude,
      startDate: activityData.startDate.toISOString(),
      endDate: activityData.endDate.toISOString(),
      maxParticipants: activityData.maxParticipants,
    });
  });
});
