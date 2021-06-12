<script>
    export let displayText;
    export let handler;
    export let customClass;
    export let isDisabled;
</script>

<button on:click|once={handler} disabled={isDisabled} class={customClass}>
    {displayText}
</button>

<style>
    .previous-button {
        float: left;
    }

    .next-button {
        float: right;
    }
</style>
