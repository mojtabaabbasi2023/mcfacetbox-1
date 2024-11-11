<script setup>
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
</script>

<template>
  <Splitpanes style="height: 400px" :rtl="true" class="default-theme">
    <Pane min-size="20" size="30">
      <div class='sidebar'>
        <VRow no-gutters justify="space-between" align="center" class="tool-bar">
          <div class='title'>
            درخت خانواده
          </div>
          <div>
            <VRow no-gutters class="btn-box">
              <IconBtn>
                <VIcon icon="tabler-settings" />
              </IconBtn>
              <IconBtn>
                <VIcon icon="tabler-x" />
              </IconBtn>
            </VRow>
          </div>
        </VRow>
      </div>
    </Pane>

    <Pane>
      <Splitpanes horizontal :rtl="true" class="default-theme">

        <Pane>
          <div class='content'>
            <VRow no-gutters justify="space-between" align="center" class="tool-bar">
              <div class='title'>
                درخت خانواده
              </div>
              <div>
                <VRow no-gutters class="btn-box">
                  <IconBtn>
                    <VIcon icon="tabler-settings" />
                  </IconBtn>
                  <IconBtn>
                    <VIcon icon="tabler-x" />
                  </IconBtn>
                </VRow>
              </div>
            </VRow>
          </div>
        </Pane>

        <Pane>
          <div class='content'>
            <VRow no-gutters justify="space-between" align="center" class="tool-bar">
              <div class='title'>
                درخت خانواده
              </div>
              <div>
                <VRow no-gutters class="btn-box">
                  <IconBtn>
                    <VIcon icon="tabler-settings" />
                  </IconBtn>
                  <IconBtn>
                    <VIcon icon="tabler-x" />
                  </IconBtn>
                </VRow>
              </div>
            </VRow>
          </div>
        </Pane>
      </Splitpanes>

    </Pane>
  </Splitpanes>
</template>

<style lang="scss">
.sidebar {
  height: 800px;
}

.sidebar,
.content {
  background-color: white;
  border-radius: 5px;
  // padding: 10px;
}

// .splitpanes {
//   &>.splitpanes__pane {
//     position: relative;

//     &::before {
//       content: '';
//       box-shadow: 0px 0px 10px rgb(0 0 0 / 18%);
//       position: absolute;
//       inset: 0;
//     }
//   }
// }

.tool-bar {
  border-bottom: 1px solid #7F56D9;
  padding: 0 15px;
}

.content {
  height: 400px;
  margin-bottom: 15px;
}

.title {
  font-weight: bold;

}
</style>
