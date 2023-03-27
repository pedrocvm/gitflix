<template>
  <div class="myProfileWrapper">
    <Heading>My Profile</Heading>

    <div class="formControl" data-cy="form-control">
      <TextField
        id="name"
        label="Name"
        :value="displayName"
        @input="updateField('displayName', $event)"
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        :value="email"
        :disabled="isUserNotEditable"
        @input="updateField('email', $event)"
      />
      <TextField
        id="oldPassword"
        label="Old Password"
        type="password"
        :value="oldPassword"
        v-if="!isUserNotEditable"
        @input="updateField('oldPassword', $event)"
      />
      <TextField
        id="newPassword"
        label="New Password"
        type="password"
        :value="newPassword"
        v-if="!isUserNotEditable"
        @input="updateField('newPassword', $event)"
      />
      <TextField
        id="confirm-password"
        label="Confirm Password"
        type="password"
        :value="confirmPassword"
        v-if="!isUserNotEditable"
        @input="updateField('confirmPassword', $event)"
      />

      <div class="actionWrapper">
        <Button @click="handleSubmit" fullwidth data-cy="submit-button"
          >Submit</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/plugins/firebase.config';
import TextField from '@/components/generics/TextField/TextField.vue';
import Button from '@/components/generics/Button/Button.vue';
import Heading from '@/components/ui/Heading/Heading.vue';

export default Vue.extend({
  name: 'MyProfileView',
  components: {
    TextField,
    Button,
    Heading,
  },
  data() {
    return {
      displayName: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },

  computed: {
    ...mapGetters('user', ['getUser']),
    isUserNotEditable() {
      const userAuthProvider = this.getUser.providerData[0].providerId;
      return (
        userAuthProvider.includes('github') ||
        userAuthProvider.includes('google')
      );
    },
  },

  mounted() {
    this.displayName = this.getUser.displayName;
    this.email = this.getUser.email;
  },

  methods: {
    ...mapActions('user', ['updateUser']),
    ...mapActions('auth', ['loginWithEmail']),
    ...mapActions('toast', ['handleToast']),

    updateField(field, value) {
      this[field] = value;
    },

    async handleSubmit() {
      if (!!this.newPassword) {
        if (!this.oldPassword) {
          this.handleToast({
            type: 'error',
            message: 'Old password is required',
          });

          return;
        }

        const isPasswordCorrect = await this.checkPassword(
          this.getUser.email,
          this.oldPassword,
        );

        if (!isPasswordCorrect) {
          this.handleToast({
            type: 'error',
            message: 'Old password is incorrect',
          });

          return;
        }

        if (this.newPassword !== this.confirmPassword) {
          this.handleToast({
            type: 'error',
            message: 'Passwords do not match',
          });

          return;
        }

        if (this.newPassword === this.oldPassword) {
          this.handleToast({
            type: 'error',
            message: 'New password cannot be same as old password',
          });

          return;
        }
      }

      this.updateUser({
        displayName: this.displayName,
        email: this.email,
        password: this.newPassword,
      });

      setTimeout(() => {
        this.$router.push('/');
      }, 500);
    },

    async checkPassword(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
