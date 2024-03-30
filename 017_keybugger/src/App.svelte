<script lang="ts">

  let pressed_keys: KeyboardEvent[] = [];

  let precise_properties= [
    'key',
    'code',
    'repeat',
    'composed',
    'metaKey',
    'isComposing',
    'location',
    'timeStamp'
  ]

  window.addEventListener('keydown', (event) => {
    pressed_keys.push(event);

    pressed_keys = pressed_keys.slice(-5);

    console.log(pressed_keys);

    // Prevent default behavior
    event.preventDefault();
  });

  const modifier_keys = [
    'Control',
    'Shift',
    'Alt',
    'Meta',
    'OS',
    'AltGraph',
    'CapsLock',
    'Fn',
    'FnLock',
    'Hyper',
    'NumLock',
    'ScrollLock',
    'Super',
    'Symbol',
    'SymbolLock'
  ]

</script>

<div class="max-w-5xl px-4 py-10 mx-auto">
  <h1 class="mb-3 text-4xl font-bold tracking-wider">Keybugger</h1>

  <p class="mb-6 text-xl">
    Keybugger is a simple keylogger that runs in the browser. It logs all the keys you press and displays them on the screen. Made by <a href="https://maximmaeder.com" target="_blank">Maxim Mäder</a>.
  </p>

  <div class="mt-4">
    
    <div class="grid items-center grid-cols-2 py-6">
      
      <h3 class="flex justify-center text-6xl">{ pressed_keys[pressed_keys.length - 1]?.key }</h3>

      <table class="table-fixed">
        <thead>
          <tr>
            <th class="w-1/2 p-2 text-left border border-neutral-600">Property</th>
            <th class="w-1/2 p-2 text-left border border-neutral-600">Value</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through all interesting properties of the last shortcut -->
          {#each precise_properties as property}
            <tr>
              <td class="p-2 border border-neutral-800">{ property }</td>
              <td class="p-2 border border-neutral-800">{ pressed_keys[pressed_keys.length - 1]?.[property] }</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <ul class="divide-y-[1px] divide-neutral-800">
      {#each Array.from(pressed_keys).reverse() as key, i}
        <li class="flex justify-center gap-6 p-4 font-mono">

          <div class="flex gap-3 text-neutral-700">
            <div class="text-3xl {key.ctrlKey ? '': 'opacity-20'}">
              CTRL
            </div>
  
            <div class="text-3xl {key.shiftKey ? '': 'opacity-20'}">
              SHIFT
            </div>
  
            <div class="text-3xl {key.altKey ? '': 'opacity-20'}">
              ALT
            </div>
          </div>

          <div class="text-3xl">
            { key.key }
          </div>

        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.neutral.900);
    color: theme(colors.neutral.200);
    
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
  }
</style>