import api from "@/lib/axios";

export const getDemo = (params: any): Promise<any> => {
  console.log(params, "params");
  return new Promise((resolve) => {
    setTimeout(() => resolve(params), 5000);
  });
  // return api.get("/getinfo", { params });
};

export const postDemo = (data: any) => {
  return api.post("/getinfo", data);
};
