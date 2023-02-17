import base64 from 'react-native-base64'
import axios from 'axios'

const getAssignObject = (taskId, workKey, taskVersion, resourceType, resourceId) => {
    return {
        workKey: workKey,
        taskId: taskId,
        taskVersion: taskVersion,
        resourceType: resourceType,
        resourceId: resourceId
    }
}


//ASSIGN 1 SINGLE TASK
export const getAssignRequestForSingleTask = () => {
    const assignReqBody = [];

    const taskId = "529111";
    const workKey = "wfs.huolto.211189";
    const taskVersion = 3;

    const resourceType = 'worker';
    const resourceId = '4176';

    const assignObject = getAssignObject(taskId, workKey, taskVersion, resourceType, resourceId);
    assignReqBody.push(assignObject);
    return assignReqBody;
}

// ASSIGNING METHODS
export const saveAssignments = async () => {
    // Save new assignments
    const assignRequest = getAssignRequestForSingleTask();
    await postAssignment(assignRequest);
  }



// UPDATE SINGLE TASKS
const postAssignment = async ( requestBody) => {
    const url = 'http://192.168.50.100/to/REST/' + 'v1/assignments/batchassign'
    const base64EncodedUserAndPass = base64.encode("grkrail.testi" + ":" + "testi1");
    try {
      const config = {
        url: url,
        method: 'POST',
        headers: { Authorization: "Basic " + base64EncodedUserAndPass },
        data: requestBody,
        transformResponse: [(data) => {
          return data
        }]
      }
      const response = await axios(config)
      console.log(response);
      return response
    } catch (error) {
      return { type: 'error', message: "Error in postAssignment" }
    }
  }