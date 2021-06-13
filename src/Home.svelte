<script>
    import Button from "./Button.svelte";
    import { Jumper } from "svelte-loading-spinners";
    import { fade } from "svelte/transition";

    let jumpToImageNumber;

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    const urlParams = new URLSearchParams(window.location.search);
    let weekQueryParam = urlParams.get("week");
    let currentWeek = 0;
    let currentWeekResponse;

    const getImageRoute = async function () {
        const res = await fetch("/currentWeek");
        currentWeekResponse = await res.json();
        await sleep(1250);
        if (weekQueryParam) {
            weekQueryParam = Number.parseInt(weekQueryParam);
            if (
                (!isNaN(weekQueryParam) &&
                    weekQueryParam > currentWeekResponse) ||
                weekQueryParam < 0
            ) {
                currentWeek = currentWeekResponse;
            } else {
                if (isNaN(weekQueryParam)) {
                    currentWeek = currentWeekResponse;
                } else {
                    currentWeek = weekQueryParam;
                }
            }
        } else {
            currentWeek = currentWeekResponse;
        }
        return `/image/${currentWeek.toString()}`;
    };

    const prevButtonHander = function () {
        window.location.href = `https://pic-of-the-week.ue.r.appspot.com/?week=${
            currentWeek - 1
        }`;
    };

    const nextButtonHander = function () {
        window.location.href = `https://pic-of-the-week.ue.r.appspot.com/?week=${
            currentWeek + 1
        }`;
    };

    const navigateToImage = function (event) {
        window.location.href = `https://pic-of-the-week.ue.r.appspot.com/?week=${jumpToImageNumber}`;
    };
</script>

<main>
    {#await getImageRoute()}
        <div class="grid">
            <Jumper size="60" color="#1496bb" unit="px" duration="1s" />
        </div>
    {:then imageRoute}
        <h1 class="main-header">
            <a href="/">Pic of the week #{currentWeek}</a>
        </h1>
        <img
            transition:fade
            src={imageRoute}
            class="main-img"
            alt="Pic of the week"
        />
        <div class="navigation">
            {#if currentWeek > 0}
                <Button
                    customClass="previous-button"
                    displayText="Previous"
                    handler={prevButtonHander}
                />
            {:else}
                <Button
                    isDisabled={true}
                    customClass="previous-button"
                    displayText="Previous"
                />
            {/if}
            <form on:submit|preventDefault={navigateToImage}>
                <label for="imageNum"
                    >Jump to week: <input
                        type="text"
                        id="imageNum"
                        name="imageNum"
                        bind:value={jumpToImageNumber}
                    />
                    <button type="submit"> Go </button>
                </label>
            </form>
            {#if currentWeek < currentWeekResponse}
                <Button
                    customClass="next-button"
                    displayText="Next"
                    handler={nextButtonHander}
                />
            {:else}
                <Button
                    isDisabled={true}
                    customClass="next-button"
                    displayText="Next"
                />
            {/if}
        </div>
    {/await}
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
        width: 1000px;
    }

    h1 {
        color: #1496bb;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    .main-header {
        margin-top: 0;
        margin-bottom: 24px;
    }

    .main-header a {
        text-decoration: none;
    }

    .main-img {
        width: 100%;
        height: 60vh;
        object-fit: contain;
    }

    .grid {
        display: grid;
        place-items: center;
    }

    .navigation {
        margin-top: 15px;
        display: flex;
        justify-content: center;
    }
    .navigation * {
        padding: 0 10px;
    }
</style>
