<script>
    import Button from "./Button.svelte";
</script>

<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="submit" />
</form>

<style>
</style>
