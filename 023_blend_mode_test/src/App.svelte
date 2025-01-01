<script lang="ts">

  const BLEND_MODES = [
    '',
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ];

  const BACKGROUNDS: Array<string | { img: string }> = [
    '#fff',
    '#000',
  ];

  const STRIPES: Array<string> = [
    '#f00',
    '#0f0',
  ];

</script>

<div class="p-8 font-bold text-2xl">
  <div>Blend Mode tester</div>
  <div class="text-base text-neutral-500">This is a simple blend mode tester to see how different blend modes interact with different colors and patterns.</div>

</div>

<div class="p-8">
  {#each BLEND_MODES as blendMode}
    <div class="flex items-center">
      <div class="w-60">{ blendMode }</div>

      <div class="grow">
        <div class="grid" style="grid-template-columns: repeat({BACKGROUNDS.length}, 1fr);">
          {#each BACKGROUNDS as background}
              {#if !blendMode}
                <div>{background}</div>
              {:else}
                <div style="background-color: {background}" title="{background}" class="min-h-8 h-full py-8">
                  {#each STRIPES as stripes}
                    <div class="flex relative">
                      
                      {#if background == BACKGROUNDS[0]}
                        <div class="right-full absolute h-full flex items-center pr-2">{ stripes }</div>
                      {/if}

                      <div style="mix-blend-mode: {blendMode}; background-color: {stripes}" class="w-full h-10"></div>
                    </div>
                  {/each}
                </div>
              {/if}
          {/each}
        </div>
          
      </div>
    </div>
  {/each}
</div>