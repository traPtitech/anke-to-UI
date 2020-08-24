<template>
  <div id="app">
    <div class="tool-wrapper">
      <div class="dropdowns">
        <button>
          <div class="dropdown">
            <p>並び替え</p>
            <span class="ti-angle-down"></span>
          </div>
        </button>
        <button>
          <div class="dropdown">
            <p>フィルター</p>
            <span class="ti-angle-down"></span>
          </div>
        </button>
      </div>
      <div class="search">
        <input type="text" placeholder="検索" />
        <button class="search-icon">
          <span class="ti-search"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '/@/router'

export default {}
</script>

<style lang="scss">
.tool-wrapper {
  display: flex;
}
.dropdowns {
  display: inherit;
}
.dropdown {
  display: inherit;
}
button {
  display: inherit;
  background-color: #ffffff;
  border: solid 1px #cfb998;
  border-radius: 5px;
}
.search {
  display: inherit;
  margin: 0 30px;
}
.search {
  input {
    border: solid 1px #dbdbdb;
    border-radius: 5px 0 0 5px;
    &::placeholder {
      color: #dbdbdb;
    }
  }
  .search-icon {
    border: solid 1px #cfb998;
    padding: 10px;
    border-radius: 0 5px 5px 0;
  }
}
</style>
