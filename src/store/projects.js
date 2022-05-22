import { createSlice, nanoid } from "@reduxjs/toolkit";

const example = [
  {
    id: nanoid(),
    image: "/proto-512.v2.svg",
    name: "Pembangunan Jalan",
    companyName: "Dinas Pekerjaan Umum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis, enim id finibus malesuada, urna tortor rhoncus quam, in mattis sapien ante et nibh. Praesent rutrum felis justo, in sodales quam porttitor nec. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas pharetra quam et aliquam aliquam. Curabitur vitae posuere sem. Nam et sagittis sem, quis blandit ex.",
    obstacles: "",
    status: "Pembangunan",
    progress: 60,
    period: new Date(),
    link: "/admin/projects/Pembangunan Jalan",
  },
  {
    id: nanoid(),
    image: "/proto-512.v2.svg",
    name: "Perawatan Jalan",
    companyName: "Dinas Pekerjaan Umum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis, enim id finibus malesuada, urna tortor rhoncus quam, in mattis sapien ante et nibh. Praesent rutrum felis justo, in sodales quam porttitor nec. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas pharetra quam et aliquam aliquam. Curabitur vitae posuere sem. Nam et sagittis sem, quis blandit ex.",
    obstacles: "",
    status: "Perawatan",
    progress: 20,
    period: new Date(),
    link: "/admin/projects/Perawatan Jalan",
  },
  {
    id: nanoid(),
    image: "/proto-512.v2.svg",
    name: "Pembangunan Gedung Pemerintahan",
    companyName: "Dinas Pekerjaan Umum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis, enim id finibus malesuada, urna tortor rhoncus quam, in mattis sapien ante et nibh. Praesent rutrum felis justo, in sodales quam porttitor nec. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas pharetra quam et aliquam aliquam. Curabitur vitae posuere sem. Nam et sagittis sem, quis blandit ex.",
    obstacles: "",
    status: "Pembangunan",
    progress: 10,
    period: new Date(),
    link: "/admin/projects/Pembangunan Gedung Pemerintahan",
  },
];

export const projectsSlice = createSlice({
  name: "team",
  initialState: () => {
    const raw = localStorage.getItem("projects");
    let data = [];
    if (raw) {
      try {
        data.push(...JSON.parse(raw));
      } catch (error) {
        data.push(...example);
        localStorage.setItem("projects", JSON.stringify(data));
      }
    } else {
      data.push(...example);
      localStorage.setItem("projects", JSON.stringify(data));
    }
    return {
      value: data,
      selected: [],
    };
  },
  reducers: {
    add: (state, { payload: { data } }) => {
      const item = {};
      Object.assign(item, data);
      Object.defineProperty(item, "id", {
        value: nanoid(),
        configurable: true,
        enumerable: true,
        writable: true,
      });
      state.value.push(item);
      localStorage.setItem(
        "projects",
        JSON.stringify(Object.assign([], state.value))
      );
    },
    put: (state, { payload: { id, data } }) => {
      const prevData = state.value.find((item) => item.id === id);
      if (prevData) {
        Object.assign(prevData, data);
        localStorage.setItem(
          "projects",
          JSON.stringify(Object.assign([], state.value))
        );
      }
    },
    del: (state, { payload }) => {},
    select: (state, { payload }) => {
      state.selected.push(payload);
    },
    unselect: (state, { payload }) => {
      state.selected.splice(state.selected.indexOf(payload), 1);
    },
    reselect: (state) => {
      state.selected = [];
    },
  },
});

export default projectsSlice.reducer;
export const projectsActions = projectsSlice.actions;
