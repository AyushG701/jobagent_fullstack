import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
    searchedQuery: "",
  },
  reducers: {
    // for all jobs
    requestForAllJobs(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    failureForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // for single job
    requestForSingleJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.error = null;
      state.singleJob = action.payload;
    },
    failureForSingleJob(state, action) {
      state.singleJob = state.singleJob;
      state.error = action.payload;
      state.loading = false;
    },

    // for posting job
    requestForPostJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForPostJob(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    failureForPostJob(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    // for deleting job
    requestForDeleteJob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteJob(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // for my jobs
    requestForMyJobs(state, action) {
      state.loading = true;
      state.myJobs = [];
      state.error = null;
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload;
      state.error = null;
    },
    failureForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = state.myJobs;
      state.error = action.payload;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.jobs = state.jobs;
    },
    resetJobSlice(state, action) {
      state.error = null;
      state.jobs = state.jobs;
      state.loading = false;
      state.message = null;
      state.myJobs = state.myJobs;
      state.singleJob = {};
    },

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

// export const fetchJobs =
//   (city, niche, searchKeyword = "") =>
//   async (dispatch) => {
//     try {
//       dispatch(jobSlice.actions.requestForAllJobs());
//       let link = "http://localhost:4000/api/v1/job/getall?";
//       let queryParams = [];

//       if (searchKeyword) {
//         queryParams.push(`searchKeyword=${searchKeyword}`);
//       }
//       if (city) {
//         queryParams.push(`city=${city}`);
//       }
//       if (niche) {
//         queryParams.push(`niche=${niche}`);
//       }
//       link += queryParams.join("&");
//       const response = await axios.get(link, { withCredentials: true });
//       dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
//       dispatch(jobSlice.actions.clearAllErrors());
//     } catch (error) {
//       console.log(jobSlice.actions.failureForAllJobs(error.response));
//       dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
//     }
//   };

export const fetchJobs =
  (city, niche, searchKeyword = "") =>
  async (dispatch) => {
    try {
      console.log("Dispatching requestForAllJobs");
      dispatch(jobSlice.actions.requestForAllJobs());

      let link = "http://localhost:4000/api/v1/job/getall?";
      let queryParams = [];

      if (searchKeyword) {
        queryParams.push(`searchKeyword=${searchKeyword}`);
      }
      if (city) {
        queryParams.push(`city=${city}`);
      }
      if (niche) {
        queryParams.push(`niche=${niche}`);
      }
      link += queryParams.join("&");

      console.log("Fetching jobs from URL:", link);
      const response = await axios.get(link, { withCredentials: true });
      console.log("Response data:", response.data);

      dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
      dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
      console.error("Error fetching jobs:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An unknown error occurred";

      dispatch(jobSlice.actions.failureForAllJobs(errorMessage));
    }
  };

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/get/${jobId}`,
      { withCredentials: true },
    );
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForSingleJob(error.response.data.message));
  }
};

export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/job/post`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/getmyjobs`,
      { withCredentials: true },
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForMyJobs(error.response.data.message));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/job/delete/${id}`,
      { withCredentials: true },
    );
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(clearAllJobErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForDeleteJob(error.response.data.message));
  }
};

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export const { setSearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;
