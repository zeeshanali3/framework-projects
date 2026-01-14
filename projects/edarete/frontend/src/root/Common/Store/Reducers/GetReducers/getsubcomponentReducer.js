import { GETSUBCOMPONENT, LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState = {
  getsubclasscomponentData: [],
};

export default function GetsubcomponentReducer(state = initialState, action) {
  switch (action.type) {
    case GETSUBCOMPONENT:
      // Group entries by SubComponentId
      const groupedData = action.payload.payload.reduce((acc, entry) => {
        const existingEntryIndex = acc.findIndex(
          (item) => item.SubComponentId === entry.SubComponentId
        );

        if (existingEntryIndex !== -1) {
          // If entry with same SubComponentId exists, add attachment to the array
          acc[existingEntryIndex].attachments.push({
            Download_url: entry.Download_url,
            FileName: entry.FileName,
            FileSize: entry.FileSize,
            FileType: entry.FileType,
          });
        } else {
          // If entry with SubComponentId does not exist, create a new entry
          acc.push({
            ...entry,
            attachments: [
              {
                Download_url: entry.Download_url,
                FileName: entry.FileName,
                FileSize: entry.FileSize,
                FileType: entry.FileType,
               },
            ],
          });
        }

        return acc;
      }, []);

     

      return {
        ...state,
        getsubclasscomponentData: groupedData,
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
