import { fetchAxiosAPI } from "api/request";
import useSWR from "swr";

//DOC: parametre or string ? see useFormSubmit
const useTypes = ({ url = "actualities" }) => {
  const { data: dataTypes, error, isLoading } = useSWR(`/${url}/types`, fetchAxiosAPI);

  const types = dataTypes?.enum?.map((enumValue: string) => ({
    value: enumValue,
    label: enumValue,
  }));

  return {
    types,
    isLoading,
    error,
  };
};

export default useTypes;
