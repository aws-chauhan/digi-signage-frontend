<template>
  <v-container fluid class="fill-height d-flex align-center justify-center">
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card class="pa-6" elevation="10">
          <v-card-title class="text-center text-h5 font-weight-bold">
            Login
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="Username"
                prepend-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                required
              />
              <v-btn
                type="submit"
                color="indigo"
                block
                class="mt-4"
                :loading="loading"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLogin } from "../composables/useLogin.js";

const { username, password, loading, handleLogin } = useLogin();
</script>
