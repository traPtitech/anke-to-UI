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
.dropdown {
  display: inherit;
  padding: 7px 16px;
  span {
    padding: 2px;
  }
  p {
    margin: 0 8px 0 0;
  }
}
button {
  display: inline-flex;
  background-color: #ffffff;
  border: solid 1px #cfb998;
  border-radius: 4px;
  padding: 0;
  &:hover {
    background-color: #f4ecec;
  }
}
.search {
  display: inherit;
  margin-left: 20px;
  input {
    border: solid 1px #dbdbdb;
    border-radius: 4px 0 0 4px;
    padding-left: 10px;
    &::placeholder {
      color: #dbdbdb;
    }
  }
  .search-icon {
    border-radius: 0 4px 4px 0;
    span {
      padding: 10px;
    }
  }
}
</style>
