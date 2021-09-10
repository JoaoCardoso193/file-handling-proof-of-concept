<script>
import FileUpload from "/imports/ui/FileUpload";
import FileDisplay from "/imports/ui/FileDisplay";
import LoginForm from "/imports/ui/LoginForm"
let user;

const handleLogout = () => {
  Meteor.logout();
}

$m: {
  user = Meteor.user();
}
</script>

{#if user}
  <button on:click={handleLogout}>Logout</button>
  <FileUpload />
  <FileDisplay />
{:else}
  <LoginForm />
{/if}
