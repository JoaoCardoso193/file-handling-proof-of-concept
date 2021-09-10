<script>
import FileUpload from "/imports/ui/FileUpload";
import LoginForm from "/imports/ui/LoginForm"
import Sources from "/imports/ui/Sources"

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
  <Sources />
{:else}
  <LoginForm />
{/if}
