<template>
<div class="container">
	<div class="columns">
		<div class="column is-4">
			<LineChart></LineChart>
		</div>
	</div>
</div>
</template>

<script>
import LineChart from '@/components/Reporte/LineChart'

export default {
  name: 'Reporte',
  components: { LineChart },
  data () {
    return {

    };
  }
};
</script>