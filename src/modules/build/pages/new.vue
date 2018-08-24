<template>
  <!-- TODO - use PageHeader component here, similar to App Editor page -->
  <!-- <EditorHeader
    title="Build"
    help="Configure a build using a single App and multiple generators"
    url="https://codotype.github.io"
  />
   -->
  <!-- <hr> -->

  <!-- Step 3 - Configure the generator -->
  <!-- Show ONLY when a generator and app are selected -->
  <div class="row">

    <b-col lg=12>
      <BuildHeader/>
      <hr>
    </b-col>

    <!-- Abstract this column into one or more components -->
    <b-col lg=3 class="border-right">

      <!-- <p class='lead mb-0'>App</p> -->
      <!-- <ul class="list-group"> -->
        <!-- <li class="list-group-item list-group-item-action" v-if="newBuildModel.app_id"> -->
          <!-- {{ selectedApp.label }} -->
        <!-- </li> -->
        <!-- <li class="list-group-item list-group-item-warning text-center" v-else> -->
          <!-- <i class="fa fa-warning"></i> -->
          <!-- No app selected -->
        <!-- </li> -->
      <!-- </ul> -->

      <!-- <p class='lead mb-0'>App</p> -->
      <ul class="list-group">
        <li class="list-group-item list-group-item-action" v-if="newBuildModel.app_id" @click="showingApp = !showingApp">
          <i class="fa fa-database"></i>
          {{ selectedApp.label }}
        </li>
        <li class="list-group-item list-group-item-warning text-center" v-else>
          <i class="fa fa-warning"></i>
          No app selected
        </li>
      </ul>

      <br>
      <!-- <hr> -->

      <button class="btn btn-outline-secondary btn-lg btn-block mb-3" v-if="selectGenerator" @click="selectGenerator = !selectGenerator">
        <i class="fa fa-times"></i>
        Cancel
      </button>

      <button class="btn btn-primary btn-lg btn-block mb-3" v-else @click="selectGenerator = !selectGenerator">
        <i class="fa fa-plus"></i>
        Add Generator
      </button>

      <div class="card">
        <!-- <p class='lead mb-0'>App</p> -->
        <div class="card-header">
          <i class="fa fa-cog"></i>
          Generators
        </div>
        <ul class="list-group list-group-flush">
          <template v-if="newBuildModel.stages[0]" v-for="each in newBuildModel.stages">
            <li class="list-group-item list-group-item-action list-group-item-primary" v-if="each.generator_id === selectedGenerator.id">
              {{ each.generator_id }}
            </li>
            <li class="list-group-item list-group-item-action" @click="selectGeneratorModel(each.generator_id)" v-else>
              {{ each.generator_id }}
            </li>
          </template>

          <!-- <li class="list-group-item list-group-item-action" v-else v-for="each in newBuildModel.stages" v-if="newBuildModel.stages[0]"> -->
            <!-- {{ each.generator_id }} -->
          <!-- </li> -->

          <li class="list-group-item list-group-item-warning text-center" v-if="!newBuildModel.stages[0]">
            <i class="fa fa-warning"></i>
            No generators selected
          </li>
        </ul>
      </div>



    </b-col>

    <div class="col-lg-9">

      <AppShow v-if="showingApp"/>

      <!-- STEP 1 - Select an App -->
      <!-- TODO - this should be determined by a state getter variable, `requiresApp` -->
      <AppSelector v-if="!newBuildModel.app_id"/>

      <!-- STEP 2 - Select a generator -->
      <GeneratorSelector v-if="(newBuildModel.app_id && !newBuildModel.stages[0]) || selectGenerator"/>

      <!-- TODO - abstract ALL of this into a separate component -->
      <!-- GeneratorConfigure component -->
      <div class="row" v-else-if='newBuildModel.stages[0] && newBuildModel.app_id'>
        <div class="col-lg-12">

          <EditorHeader
            :title="selectedGenerator.label"
            :help="selectedGenerator.description"
            :url="'http://github.com/'+selectedGenerator.github_url"
          />

          <hr>

          <b-tabs>

            <!-- TODO - move overview into its own component -->
            <b-tab title="Generator Overview" active>
              <!-- <p class="lead mt-3">A generator for Vue.js, Vue Router, Vuex, &amp; Bootstrap</p> -->
              <p class="lead mt-3">{{selectedGenerator.description}}</p>
              <p class='lead text-danger'>TODO - include longer description (in markdown?)</p>
            </b-tab>

            <b-tab title="Global Options" v-if="selectedGenerator.global_options[0]" >
              <br>
              <GeneratorGlobalOptions/>
            </b-tab>

            <b-tab title="Model Options" v-if="selectedGenerator.model_options[0]" >
              <br>
              <GeneratorModelOptions/>
            </b-tab>

            <b-tab title="Addons" v-if="selectedGenerator.addons[0]" >
              <br>
              <GeneratorAddonForm/>
            </b-tab>

          </b-tabs>

        </div>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import GeneratorModelOptions from '@/modules/build/components/GeneratorModelOptions'
import GeneratorGlobalOptions from '@/modules/build/components/GeneratorGlobalOptions'
import GeneratorAddonForm from '@/modules/build/components/GeneratorAddonForm'
import GeneratorSelector from '@/modules/build/components/GeneratorSelector'
import AppSelector from '@/modules/build/components/AppSelector'
import BuildHeader from '@/modules/build/components/BuildHeader'
import AppShow from '@/modules/project/pages/show'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    GeneratorModelOptions,
    GeneratorGlobalOptions,
    GeneratorAddonForm,
    GeneratorSelector,
    AppSelector,
    BuildHeader,
    AppShow
  },
  data () {
    return { // TODO - move this into build vuex state
      selectGenerator: false,
      showingApp: false
    }
  },
  destroyed () {
    this.resetNewBuildModel()
  },
  computed: mapGetters({
    newBuildModel: 'build/newModel',
    schemas: 'schema/collection',
    fetching: 'generator/fetching',
    generatorCollection: 'generator/collection',
    selectedGenerator: 'generator/selectedModel',
    selectedApp: 'project/selectedModel'
  }),
  methods: mapActions({
    resetNewBuildModel: 'build/resetNewModel',
    selectGeneratorModel: 'generator/selectModel'
  })
}
</script>