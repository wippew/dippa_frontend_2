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
const getAssignRequestForTasks = (fetchedRoutesJsonObj) => {
    const assignReqBody = [];

    for (let i = 1; i < fetchedRoutesJsonObj.features.length; i++) {
      const currentTask = fetchedRoutesJsonObj.features[i];
      let taskId = null;
      if (currentTask.taskVersion != 0) {
          taskId = currentTask.taskId;
      }
      const workKey = currentTask.workKey;
      const taskVersion = currentTask.taskVersion;

      const resourceType = 'group';
      const resourceId = 64105;

      const assignObject = getAssignObject(taskId, workKey, taskVersion, resourceType, resourceId);
      assignReqBody.push(assignObject);
    }

    return assignReqBody;
}

// ASSIGNING METHODS
export const saveAssignments = async (fetchedRoutesJson) => {
    const fetchedRoutesJsonObj = JSON.parse(JSON.stringify(fetchedRoutesJson));
    // Save new assignments
    const assignRequest = getAssignRequestForTasks(fetchedRoutesJsonObj);
    await postAssignment(assignRequest);
  }



// UPDATE SINGLE TASKS
const postAssignment = async ( requestBody) => {
    const url = 'http://192.168.50.100/to/REST/' + 'v1/assignments/batchassign'
    const base64EncodedUserAndPass = base64.encode("KPA02.tyonjohtaja" + ":" + "testi1");
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