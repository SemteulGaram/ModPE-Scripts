var context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
// PE의 메인 액티비티의 context를 가져오나 봅니다.

context.runOnUiThread(new java.lang.Runnable(
{
 run: function()
 {
  try{
   var service = new 
android.service.dreams.DreamService();
  }catch(err) {
  	print(err);
  }
 }
}));


var Renderer = android.opengl.GLSurfaceView.Renderer;
var GL10 = javax.microedition.khronos.opengles.GL10;
var GLU = android.opengl.GLU;
var GLSurfaceView = android.opengl.GLSurfaceView;
var Context = android.content.Context;
// 임포트 비슷한겁니다. 나중에 귀찮아 지시기 싫으시면 쓰시길...

function getFloatBuffer(array)
{
 try{
  var tmp = new java.nio.ByteBuffer.allocateDirect(array.length*4);
  tmp.order(java.nio.ByteOrder.nativeOrder());
  var buffer = tmp.asFloatBuffer();
  buffer.put(array);
  buffer.position(0);
  return buffer;
 }catch(e)
 {
  print(e + "\n" + e.lineNumber);
 }
}
function getByteBuffer(array)
{
 try{
  var buffer = new java.nio.ByteBuffer.allocateDirect(array.length);
  buffer.put(array);
  buffer.position(0);
  return buffer;
 }catch(e)
 {
  print(e + "\n" + e.lineNumber);
 }
}
// GL은 인자를 버퍼로? 받는다더군요 그래서 배열을 바꿔주는 함수입니다.
context.runOnUiThread(new java.lang.Runnable(
{
 run: function()
 {
  try{
   var layout = new android.widget.LinearLayout(context);
   layout.setOrientation(1);
   layout.setLayoutParams(new android.view.ViewGroup.LayoutParams(-1,-1));
   layout.setGravity(android.view.Gravity.LEFT);
   // surface뷰를 팝업 윈도우로 못 띄우더군요. 그래서 addContentView로 띄우는데 서피스뷰를 바로 집어넣으면 위치 변경이 힘들어져요. 그래서 레이아웃을 썼어요
   
   var block = { // 블록 객체예요. gl좌표상에 네모난 큐브를 그리기 위해 갖가지 정보와 함수를 설정해 줘야죠.
    draw: function(gl,x,y,z)
    { // 자바스크립트에서 생성자 쓰는법을 모르겠어요. 그래서 그냥 한번에 좌표설정과 그리기를 동시에 해요.
     try{
      var vertices = [
       x-0.5,y+0.5,z+0.5,
       x+0.5,y+0.5,z+0.5,
       x+0.5,y-0.5,z+0.5,
       x-0.5,y-0.5,z+0.5,
       
       x-0.5,y+0.5,z-0.5,
       x+0.5,y+0.5,z-0.5,
       x+0.5,y-0.5,z-0.5,
       x-0.5,y-0.5,z-0.5]; // 큐브를 그릴건데 한 줄이 점 하나의 좌표예요. 큐브의 꼭짓점은 8개고 그에 맞는 좌표를 설정해 줳죠
      var indices = [
        0, 3, 2,
        0, 1, 2,
        0, 4, 7,
        0, 3, 7,
        4, 7, 6,
        4, 5, 6,
        5, 1, 2,
        5, 6, 2,
        0, 4, 5,
        0, 1, 5,
        3, 7, 6,
        3, 2, 6]; // 위에서 써넣은 좌표들이 순서대로 0,1,2,3••• 번호를 갖게되요.그리고 gl은 삼각형을 여러개 이어붙혀서 도형을 그린다더군요. 여기에 쓴 배열은 좌표들을 삼각형으로 적절히 이어준 거예요. 한 번 머릿속으로 상상해 보세요.
      var colors = [
       1.0,  1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,  1.0,
       0.5,  0.5,  0.5,  1.0,
       0.5,  0.5,  0.5,  1.0,
       1.0,  1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,  1.0,
       0.5,  0.5,  0.5,  1.0,
       0.5,  0.5,  0.5,  1.0]; // 각 꼭짓점에 색을 설정해 주는건데 값은 0.0~1.0까지예요. 순서는 R,G,B,A구요
      var mVertexBuffer = getFloatBuffer(vertices);
      var mIndexBuffer = getByteBuffer(indices);
      var mColorBuffer = getFloatBuffer(colors);
      //위에 쓴 배열을 버퍼로 바꿔주는겁니다.
      
      gl.glLoadIdentity(); // 배울땐 뭐지 뭔 초기화랬는데 저도 그리 잘 몰라서 직접 찾아보시길...
      gl.glFrontFace(GL10.GL_CW); // 그릴때 방향을 설정하는 거예요. 반시계 방향으로 그릴건지, 시계방향으로 그릴껀지 설정하는거죠. 근데 뭐로해도 상관없는것 같던데 아시는분 답변좀요.
      gl.glEnableClientState(GL10.GL_VERTEX_ARRAY); // 이것도 잘 모르겠는데 꼭짓점 버퍼를 설정할수 있게? 하는것 같아요.
      gl.glVertexPointer(3,GL10.GL_FLOAT,0,mVertexBuffer); // 꼭짓점을 설정하는데 첫번째 부분이 음... 까먹었네요. 두번째는 float형으로 넘겨준다는거구요 0은 첨부터 몰랐어ㅇ...
      gl.glEnableClientState(GL10.GL_COLOR_ARRAY); // 마찬가지로 색 배열 버퍼를 활성화하는것 같네요
      gl.glColorPointer(4,GL10.GL_FLOAT,0,mColorBuffer); /* 이거보고 생각이 났는데 아무래도 첫번째 인자가 버텍스는
0,0,0,
1,2,3,
4,5,6 이렇게 끊고 칼러는
0,0,0,0,
1,2,3,4 이렇게 3개,4개씩 끊었잖아요. 그걸 설정하는것 같네요. 나머지는 전과 같구요
*/
      gl.glTranslatef(0,0,-5); // gl좌표에서 카메라는 0,0,0 에서 z의-되는부분을 보고있다네요 그래서 좌표계를 보는방향 기준으로 10 떨어뜨렸어요
      gl.glRotatef(45,1,0,0); // 각도,x축,y축,z축 이라고 배웠는데 이게 x축을 기준으로 45도 돌린건가 그거더군요
      gl.glRotatef(45,0,1,0); // 이건 y축을 기준으로 돌렸네요. 누구혹시 여기에 2 이상의 수를 넣으면 어떻게되는지 아시는분 답변좀요.
      gl.glDrawElements(GL10.GL_LINE_LOOP/*GL10.GL_TRIANGLES*/,indices.length,GL10.GL_UNSIGNED_BYTE,mIndexBuffer); // 삼각형 모양으로 그린다는게 첫번째 인자인데 LINE인가 그런거 넣으면 선으로 표시되고 나머지는 이해 가능하실거라 믿을게요
      gl.glDisableClientState(GL10.GL_VERTEX_ARRAY); // 꼭짓점 버퍼 비활성화하는것같은데 왜 비활성화 하죠?
      gl.glDisableClientState(GL10.GL_COLOR_ARRAY); // 위와 같아요.
     }catch(e)
     {
      print(e + "\n" + e.lineNumber);
     }
    }
   };
   
   
   var surfaceView = GLSurfaceView(context); // 서비스 뷰를 생성해 줘요.
   surfaceView.setZOrderOnTop(true);
   surfaceView.setRenderer(new Renderer( // 렌더러가 인터페이스일껄요 그래서 함수를 구현해주는데 갑자기 구조가 이해 안되네요
   {
    onSurfaceCreated: function(gl,config) // gl이 생성됬을 때 호출된답니다. 기본적인 셋팅을 여기서 한대요.
    {
     gl.glShadeModel(GL10.GL_SMOOTH); // 그림자설정? 그런것 같은데 기억이 가물가물
     gl.glClearColor(0.1,0.1,0.1,1.0); // 뭐 서피스뷰의 배경 색을 칠하는거예요 마찬가지로 rgba구요
     gl.glClearDepthf(1.0); // 까먹
     gl.glEnable(GL10.GL_DEPTH_TEST); // 까먹
     gl.glDepthFunc(GL10.GL_LEQUAL); // 까먹
     gl.glHint(GL10.GL_PERSPECTIVE_CORRECTION_HINT,GL10.GL_NICEST); // 가물가물한데 까먹었다 칩시다.
    },
    onSurfaceChanged: function(gl,width,height)// 화면의 크기가 변경됬다던지 할때 호출된대요 이것도 처음 시작시 호출이 한 번 된다더군요
    {
     gl.glViewport(0,0,width,height); // 아무래도 크기조절인듯요
     gl.glMatrixMode(GL10.GL_PROJECTION); // 음...기억이 날듯말듯 안나네요
     gl.glLoadIdentity(); // 대체 왜 초기화 하죠?
     GLU.gluPerspective(gl,45.0,width/height,1.0,50.0); // 첫번째인자는 그냥 gl이고 두번째는 양옆 볼수있는 각도, ModPE.setFov랑 비슷한 개념이예요. 아니 같나... 세번째는 화면 비율같고 네번째는 최소로 볼 수 있는 거리, 다섯번째는 최대 볼수있는거리, 즉 1.0미만, 50.0 초과한 거리에 있으면 안보인다는거죠
     gl.glMatrixMode(GL10.GL_MODELVIEW); // 까먹...
     gl.glLoadIdentity(); // 왜있는지 궁금할 따름
    },
    onDrawFrame: function(gl) // 계속 수시로 호출되요 gl을 지우고 그리고 지우고 그리고... 여기서 속도가 빠르면 프레임이 높고 스파게티코드면 프레임이 낮은거죠
    {
     try{
      gl.glClear(GL10.GL_COLOR_BUFFER_BIT|GL10.GL_DEPTH_BUFFER_BIT); // 몰라요
      gl.glLoadIdentity(); // 음...
      gl.glTranslatef(0,0,-10); // 위에서 초기화 시켰으니 다시 앞으로 밀어주나 봅니다.
      block.draw(gl,0,0,0); // 블록을 그려요. 이 메소드 세팅은 아까 다 했죠?
     }catch(e)
     {
      print(e);
     }
    }
   }));
   surfaceView.setLayoutParams(new android.view.ViewGroup.LayoutParams(120*Math.ceil(context.getResources().getDisplayMetrics().density),120*Math.ceil(context.getResources().getDisplayMetrics().density)));
   // dp사이즈로 서피스 뷰의 크기를 설정해요.
   
   layout.addView(surfaceView);
   // 레이아웃에 넣구요
   
   context.addContentView(layout,new android.view.ViewGroup.LayoutParams(-1,-1));
   // 띄어요
   
  }catch(e)
  {
   print(e + "\n" + e.lineNumber);
  }
 }
}));