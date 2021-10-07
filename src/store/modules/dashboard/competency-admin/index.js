import * as TYPES from "../../../mutation.types";
import * as competencyService from "../../../../shared/services/competency.service";
import Vue from "vue";
import router from "../../../../router";
import _ from "lodash";
const state = {
  competencyDataAdmin: [],
  competencyTypeDataAdmin: [],
  competencyDetailDataAdmin: {},
  saveData: null
};

const mutations = {
  [TYPES.GET_ALL_COMPETENCY_ADMIN]: (state, data) => {
    state.competencyDataAdmin = data;
  },
  [TYPES.GET_ALL_COMPETENCY_TYPE_ADMIN]: (state, data) => {
    state.competencyTypeDataAdmin = data;
  },
  [TYPES.SAVE_COMPETENCY_ADMIN]: (state, data) => {
    state.saveData = data;
  },
  [TYPES.GET_DETAIL_COMPETENCY_ADMIN]: (state, data) => {
    state.competencyDetailDataAdmin = data;
  }
};

const actions = {
  getAllCompetencyAdmin({ commit }) {
    competencyService.getAllCompetencyAdmin().then((res) => {
      commit(TYPES.GET_ALL_COMPETENCY_ADMIN, res)
    });
  },
  getAllCompetencyTypeAdmin({ commit }) {
    competencyService.getAllCompetencyTypeAdmin().then((res) => {
      commit(TYPES.GET_ALL_COMPETENCY_TYPE_ADMIN, res)
    });
  },
  getDetailCompetencyAdmin({ commit },id) {
    competencyService.getDetailCompetencyAdmin(id).then((res) => {
      commit(TYPES.GET_DETAIL_COMPETENCY_ADMIN, res)
    });
  },
  saveCompetency ({ commit }, data) {
    console.log();
    competencyService.saveCompetency(data,data.get('id'))
        .then((res) => {
          commit(TYPES.SAVE_COMPETENCY_ADMIN, res)
          router.push("/competency-manager");
          Vue.notify({
            group: "notification",
            title: "Notification",
            type: "success",
            text:  !data.get('id') ? "Create competency Successfully" : "Update competency Successfully"
          });
        })
  },
};

const getters = {
  getDataCompetencyAdmin: (state) => {
    state.competencyDataAdmin = _( state.competencyDataAdmin || [] ).groupBy( 'competency_type_id' )
    .map( ( items ) => {
      return {
        competencyGroup: { ...items[0].competency_type},
        itemData: (items || []).map(competency => {
          const model = {
            id: competency.id,
            name: competency.name,
            description: competency.description && competency.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
          }
          return model;
        })
      };
    } )
    .value();
    return state.competencyDataAdmin;
  },
  getDataDetailCompetencyAdmin: (state) => {
    (state.competencyDetailDataAdmin.dimensions || []).map(item1 => {
        item1['dimensionLevel'] = item1.dimension_level;
        return item1;
      })
    return state.competencyDetailDataAdmin
  },
  getDataCompetencyTypeAdmin: (state) => {
    return state.competencyTypeDataAdmin;
  },

};

export default {
  state,
  mutations,
  getters,
  actions,
};
