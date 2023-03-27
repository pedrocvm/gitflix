<template>
  <div class="authWrapper">
    <Heading>
      {{ title }}
    </Heading>

    <form class="formControl" @submit.prevent="handleSubmit" ref="authForm">
      <div v-if="isSignUpMode">
        <TextField
          id="name"
          label="Name"
          :value="displayName"
          required
          @input="handleDisplayNameInput"
        />
      </div>

      <div class="formFieldWrapper">
        <TextField
          id="email"
          label="Email"
          type="email"
          :value="email"
          required
          @input="handleEmailInput"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          :value="password"
          required
          @input="handlePasswordInput"
        />
      </div>

      <div v-if="isSignUpMode">
        <TextField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          :value="confirmPassword"
          required
          @input="handleConfirmPasswordInput"
        />
      </div>

      <div class="actionWrapper">
        <Button type="submit" fullwidth data-cy="submit-button">{{
          title
        }}</Button>

        <div class="forgotMyPassword">
          <Button type="button" minimal @click="handleResetPassword"
            >Forgot your password?</Button
          >
        </div>

        <div class="toggleFormButton">
          {{ toggleText }}
          <Button type="button" @click="toggleMode" minimal>{{
            toggleButtonText
          }}</Button>
        </div>

        <div class="socialLogin">
          <div
            v-for="provider in socialProviders"
            :key="provider"
            :class="provider + 'Button'"
          >
            <Button
              type="button"
              @click="loginWithProvider(provider)"
              fullwidth
            >
              <Icon :icon="provider" />
              {{ title }} with {{ provider }}
            </Button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import TextField from '@/components/generics/TextField/TextField.vue';
import Button from '@/components/generics/Button/Button.vue';
import Icon from '@/components/generics/Icon/Icon.vue';
import Heading from '@/components/ui/Heading/Heading.vue';

export default Vue.extend({
  name: 'AuthView',
  components: {
    TextField,
    Button,
    Icon,
    Heading,
  },
  data() {
    return {
      mode: 'signin',
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      socialProviders: ['google', 'github'],
    };
  },
  computed: {
    isSignUpMode(): boolean {
      return this.mode === 'signup';
    },
    title(): string {
      return this.isSignUpMode ? 'Sign Up' : 'Sign In';
    },
    toggleText(): string {
      return this.isSignUpMode
        ? 'Already have an account?'
        : "Don't have an account?";
    },
    toggleButtonText(): string {
      return this.isSignUpMode
        ? 'Click here to Sign in'
        : 'Click here to Sign up';
    },
  },
  methods: {
    ...mapActions('auth', [
      'loginWithEmail',
      'loginWithGoogle',
      'loginWithGithub',
      'signUpWithEmail',
      'resetPassword',
    ]),
    ...mapActions('toast', ['handleToast']),

    handleDisplayNameInput(value: string) {
      this.displayName = value;
    },

    handleEmailInput(value: string) {
      this.email = value;
    },

    handlePasswordInput(value: string) {
      this.password = value;
    },

    handleConfirmPasswordInput(value: string) {
      this.confirmPassword = value;
    },

    toggleMode() {
      this.mode = this.mode === 'signin' ? 'signup' : 'signin';
    },

    async loginWithProvider(provider: 'google' | 'github') {
      const methodName = `loginWith${
        provider.charAt(0).toUpperCase() + provider.slice(1)
      }` as 'loginWithGoogle' | 'loginWithGithub';
      await this[methodName]();

      this.$router.push('/');
    },

    async handleSubmit() {
      try {
        if (this.mode === 'signin') {
          await this.loginWithEmail({
            email: this.email,
            password: this.password,
          });
        } else {
          if (this.password !== this.confirmPassword) {
            this.handleToast({
              type: 'error',
              message: 'Passwords do not match',
            });
            return;
          }

          await this.signUpWithEmail({
            displayName: this.displayName,
            email: this.email,
            password: this.password,
          });
        }

        if (this.$store.getters['user/getUser']) {
          this.$router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    },

    async handleResetPassword() {
      this.resetPassword(this.email);
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
