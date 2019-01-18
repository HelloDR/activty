/**
 * Created by 15345 on 2019/1/18.
 */
$(function () {
  $('#f_file').fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data);
    }
  });
});
