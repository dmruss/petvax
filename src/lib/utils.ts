type OriginalObject = {
    id: string;
    user_id: string;
    name: string;
    date_admin: Date;
    date_next: Date;
  };
  
  type MappedObject = {
    name: string;
    dateAdministered: string;
    nextDueDate: string;
    id: string; 
    notificationEmail: string; 
    notificationPhone: string;
  };
  
  // Define the mapping between old keys and new keys
  const keyMapping: Record<string, keyof MappedObject> = {
    id: "id",
    name: "name",
    date_admin: "dateAdministered",
    date_next: "nextDueDate",
  };
  
  // Function to swap object keys
  export const swapKeys = (originalArray: OriginalObject[]): MappedObject[] => {
    return originalArray.map((item) => {
      const swappedObject: Partial<MappedObject> = {};
      
      Object.keys(item).forEach((key) => {
        if (keyMapping[key]) {
          // @ts-ignore: Handle dynamic key assignment
          swappedObject[keyMapping[key]] = item[key as keyof OriginalObject]?.toString();
        }
      });
  
      return swappedObject as MappedObject;
    });
  };
  